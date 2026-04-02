import { z } from "zod";
import { COOKIE_NAME } from "../shared/const.js";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";
import { invokeLLM } from "./_core/llm";
import {
  getTravelerProfile, upsertTravelerProfile,
  getUserTrips, getTripById, createTrip, updateTrip, deleteTrip,
  getUserPriceAlerts, createPriceAlert, deletePriceAlert,
  upsertPushToken,
} from "./db";

export const appRouter = router({
  system: systemRouter,

  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  // ─── Traveler Profile ────────────────────────────────────────────────────────────────────
  profile: router({
    get: protectedProcedure.query(async ({ ctx }) => {
      return getTravelerProfile(ctx.user.id);
    }),
    sync: protectedProcedure
      .input(z.object({
        explorerScore:     z.number().min(0).max(100).optional(),
        relaxerScore:      z.number().min(0).max(100).optional(),
        adventurerScore:   z.number().min(0).max(100).optional(),
        culturalistScore:  z.number().min(0).max(100).optional(),
        foodieScore:       z.number().min(0).max(100).optional(),
        photographerScore: z.number().min(0).max(100).optional(),
        historianScore:    z.number().min(0).max(100).optional(),
        naturalistScore:   z.number().min(0).max(100).optional(),
        xp:                z.number().min(0).optional(),
        points:            z.number().min(0).optional(),
        quizCompleted:     z.number().min(0).max(1).optional(),
        swipeCompleted:    z.number().min(0).max(1).optional(),
        preferences:       z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        await upsertTravelerProfile({ userId: ctx.user.id, ...input });
        return { success: true };
      }),
  }),

  // ─── Trips ──────────────────────────────────────────────────────────────────────────────
  trips: router({
    list: protectedProcedure.query(async ({ ctx }) => getUserTrips(ctx.user.id)),
    get: protectedProcedure
      .input(z.object({ tripId: z.number() }))
      .query(async ({ ctx, input }) => getTripById(input.tripId, ctx.user.id)),
    create: protectedProcedure
      .input(z.object({
        destination: z.string().min(1).max(128),
        country:     z.string().max(64).optional(),
        startDate:   z.string().max(16).optional(),
        endDate:     z.string().max(16).optional(),
        budget:      z.number().optional(),
        currency:    z.string().max(8).optional(),
        itinerary:   z.string().optional(),
        companions:  z.string().optional(),
        expenses:    z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        await createTrip({ userId: ctx.user.id, ...input });
        return { success: true };
      }),
    update: protectedProcedure
      .input(z.object({
        tripId:      z.number(),
        destination: z.string().min(1).max(128).optional(),
        country:     z.string().max(64).optional(),
        startDate:   z.string().max(16).optional(),
        endDate:     z.string().max(16).optional(),
        status:      z.enum(["planning", "booked", "active", "completed"]).optional(),
        budget:      z.number().optional(),
        currency:    z.string().max(8).optional(),
        itinerary:   z.string().optional(),
        companions:  z.string().optional(),
        expenses:    z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const { tripId, ...data } = input;
        await updateTrip(tripId, ctx.user.id, data);
        return { success: true };
      }),
    delete: protectedProcedure
      .input(z.object({ tripId: z.number() }))
      .mutation(async ({ ctx, input }) => {
        await deleteTrip(input.tripId, ctx.user.id);
        return { success: true };
      }),
  }),

  // ─── Price Alerts ───────────────────────────────────────────────────────────────────
  priceAlerts: router({
    list: protectedProcedure.query(async ({ ctx }) => getUserPriceAlerts(ctx.user.id)),
    create: protectedProcedure
      .input(z.object({
        destination: z.string().min(1).max(128),
        targetPrice: z.number().min(1),
        type:        z.enum(["flight", "hotel", "package"]).default("flight"),
      }))
      .mutation(async ({ ctx, input }) => {
        await createPriceAlert({ userId: ctx.user.id, ...input });
        return { success: true };
      }),
    delete: protectedProcedure
      .input(z.object({ alertId: z.number() }))
      .mutation(async ({ ctx, input }) => {
        await deletePriceAlert(input.alertId, ctx.user.id);
        return { success: true };
      }),
  }),

  // ─── AI Cultural Guide ─────────────────────────────────────────────────────────────
  culturalGuide: router({
    generate: publicProcedure
      .input(z.object({ destination: z.string().min(1).max(100) }))
      .query(async ({ input }) => {
        const dest = input.destination;
        const prompt = `Generate a cultural travel guide for "${dest}" as JSON with this exact structure:
{
  "headline": "one sentence describing the culture/vibe",
  "emoji": "flag emoji",
  "religion": [{"label":"...","value":"...","type":"do"},...],
  "dress": [{"label":"...","value":"...","type":"info"},...],
  "food": [{"label":"...","value":"...","type":"tip"},...],
  "laws": [{"label":"...","value":"...","type":"dont"},...],
  "etiquette": [{"label":"...","value":"...","type":"do"},...],
  "visa": [{"label":"...","value":"...","type":"info"},...]
}
Each section needs 4 items. type must be one of: do, dont, info, tip.
For visa: include Israeli, US, and EU passport info.
Return ONLY valid JSON, no markdown.`;
        try {
          const response = await invokeLLM({
            messages: [
              { role: "system", content: "You are a travel cultural expert. Return only valid JSON." },
              { role: "user", content: prompt },
            ],
            response_format: { type: "json_object" },
          });
          const raw = response.choices[0].message.content;
          return JSON.parse(typeof raw === "string" ? raw : JSON.stringify(raw));
        } catch {
          return null;
        }
      }),
  }),

  // ─── Push Tokens ──────────────────────────────────────────────────────────────────
  pushTokens: router({
    register: protectedProcedure
      .input(z.object({
        token:    z.string().min(1).max(256),
        platform: z.enum(["ios", "android", "web"]).default("ios"),
      }))
      .mutation(async ({ ctx, input }) => {
        await upsertPushToken({ userId: ctx.user.id, ...input });
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
