# ── Stage 1: Build ──────────────────────────────────────────────────────────
FROM node:22-alpine AS builder

WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@9.12.0 --activate

# Copy dependency manifests first (layer cache)
COPY package.json pnpm-lock.yaml ./

# Install all dependencies (including devDeps for build)
RUN pnpm install --frozen-lockfile

# Copy source
COPY . .

# Build the server bundle
RUN pnpm build

# ── Stage 2: Production image ────────────────────────────────────────────────
FROM node:22-alpine AS runner

WORKDIR /app

# Install pnpm for production install
RUN corepack enable && corepack prepare pnpm@9.12.0 --activate

# Copy only what's needed for production
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod

# Copy the compiled server bundle
COPY --from=builder /app/dist ./dist

# Copy drizzle schema for migrations
COPY --from=builder /app/drizzle ./drizzle

# Copy scripts (seed, etc.)
COPY --from=builder /app/scripts ./scripts

# Expose the API port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
  CMD wget -qO- http://localhost:3000/health || exit 1

# Start the server
CMD ["node", "dist/index.js"]
