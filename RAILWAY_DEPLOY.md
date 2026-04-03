# TRAVI — Railway Deployment Guide

## Quick Deploy

A. Install Railway CLI:
```bash
npm install -g @railway/cli
```

B. Login:
```bash
railway login
```

C. Link project (first time):
```bash
railway init
# Select "Empty Project", name it "travi"
```

D. Add PostgreSQL database:
```bash
railway add --plugin postgresql
```

E. Deploy:
```bash
railway up --service travi-api
```

F. Run migrations + seed:
```bash
railway run pnpm db:push
railway run tsx scripts/seed.ts
```

---

## Required Environment Variables

Set these in Railway Dashboard → Service → Variables:

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string (auto-set by Railway plugin) | `postgresql://user:pass@host:5432/db` |
| `NODE_ENV` | Environment | `production` |
| `JWT_SECRET` | Secret for JWT tokens (min 32 chars) | `your-super-secret-key-here` |
| `MANUS_API_KEY` | Manus AI API key for LLM features | `sk-...` |
| `STRIPE_SECRET_KEY` | Stripe secret key | `sk_live_...` |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret | `whsec_...` |
| `STRIPE_PUBLISHABLE_KEY` | Stripe publishable key | `pk_live_...` |
| `S3_BUCKET` | S3 bucket for file uploads | `travi-uploads` |
| `S3_REGION` | S3 region | `us-east-1` |
| `S3_ACCESS_KEY` | S3 access key | `AKIA...` |
| `S3_SECRET_KEY` | S3 secret key | `...` |

---

## GitHub Actions CI/CD

A. Add secrets to GitHub repository (Settings → Secrets → Actions):
   - `RAILWAY_TOKEN` — from Railway Dashboard → Account → Tokens
   - `DATABASE_URL` — your Railway PostgreSQL URL

B. Push to `main` branch → automatic deploy triggered.

---

## Health Check

After deployment, verify:
```bash
curl https://your-railway-url.railway.app/health
# Expected: {"status":"ok","timestamp":"..."}
```

---

## Rollback

```bash
railway rollback --service travi-api
```
