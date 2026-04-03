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
  getWalletBalance, createWalletTransaction,
  getTripItineraryItems, createItineraryItem, updateItineraryItem, deleteItineraryItem,
  upsertQuickDnaResult, getQuickDnaResult, createDnaSession,
  getTripReflection, upsertTripReflection,
  getUserConversations, createConversation, getConversationMessages, createMessage,
  getUserSupportTickets, createSupportTicket, updateSupportTicket,
  getUserReferrals, createReferral, getReferralByCode,
  getUserConnections, createSocialConnection, updateSocialConnection,
  getSocialMessages, createSocialMessage,
  getProperties, getPropertyById,
  getReContacts,
  getEnterpriseMetrics, upsertEnterpriseMetric,
  getProspects, createProspect, updateProspect,
  getUserPreferences, upsertUserPreferences,
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

  // ─── AI Agent Chat ──────────────────────────────────────────────────────────────────
  agent: router({
    chat: publicProcedure
      .input(z.object({
        message: z.string().min(1).max(2000),
        history: z.array(z.object({
          role: z.enum(["user", "assistant"]),
          content: z.string(),
        })).max(20).optional().default([]),
      }))
      .mutation(async ({ input }) => {
        const systemPrompt = `You are TRAVI, an expert AI travel agent. You help users plan trips, find deals, understand visa requirements, suggest activities, and answer any travel-related questions.

You are friendly, knowledgeable, and proactive. You speak Hebrew naturally and can switch to English if needed.

Key capabilities:
- Trip planning and itinerary building
- Flight and hotel recommendations
- Visa and entry requirements
- Budget optimization and cashback tips
- Local culture, food, and activities
- Safety and health advice
- Real-time price alerts
- TRAVI Points loyalty rewards explanation

Always be helpful, concise, and actionable. Use emojis sparingly but naturally.`;

        const messages = [
          { role: "system" as const, content: systemPrompt },
          ...input.history.map((h) => ({ role: h.role as "user" | "assistant", content: h.content })),
          { role: "user" as const, content: input.message },
        ];

        try {
          const response = await invokeLLM({ messages });
          const raw = response.choices[0].message.content;
          const reply = typeof raw === "string" ? raw : JSON.stringify(raw);
          return { reply };
        } catch {
          return { reply: "מצטער, נתקלתי בבעיה טכנית. נסה שוב בעוד רגע 🙏" };
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

  // ─── Wallet ───────────────────────────────────────────────────────────────────
  wallet: router({
    balance: protectedProcedure.query(async ({ ctx }) => getWalletBalance(ctx.user.id)),
    addFunds: protectedProcedure
      .input(z.object({ amount: z.number().min(1), currency: z.string().default("USD"), description: z.string().optional() }))
      .mutation(async ({ ctx, input }) => {
        await createWalletTransaction({ userId: ctx.user.id, type: "credit", ...input });
        return { success: true };
      }),
    redeem: protectedProcedure
      .input(z.object({ amount: z.number().min(1), tripId: z.number().optional(), description: z.string().optional() }))
      .mutation(async ({ ctx, input }) => {
        const { balance } = await getWalletBalance(ctx.user.id);
        if (balance < input.amount) throw new Error("Insufficient balance");
        await createWalletTransaction({ userId: ctx.user.id, type: "debit", currency: "USD", ...input });
        return { success: true };
      }),
  }),

  // ─── Itinerary Items ──────────────────────────────────────────────────────────
  itinerary: router({
    list: protectedProcedure
      .input(z.object({ tripId: z.number() }))
      .query(async ({ ctx, input }) => getTripItineraryItems(input.tripId, ctx.user.id)),
    create: protectedProcedure
      .input(z.object({
        tripId: z.number(),
        type: z.enum(["flight","hotel","activity","restaurant","transport","note"]),
        title: z.string().min(1).max(256),
        description: z.string().optional(),
        location: z.string().optional(),
        date: z.string().optional(),
        startTime: z.string().optional(),
        endTime: z.string().optional(),
        cost: z.number().optional(),
        currency: z.string().optional(),
        sortOrder: z.number().optional(),
        metadata: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => createItineraryItem({ userId: ctx.user.id, confirmed: false, ...input })),
    update: protectedProcedure
      .input(z.object({
        itemId: z.number(),
        title: z.string().optional(),
        description: z.string().optional(),
        startTime: z.string().optional(),
        endTime: z.string().optional(),
        sortOrder: z.number().optional(),
        confirmed: z.boolean().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const { itemId, ...data } = input;
        await updateItineraryItem(itemId, ctx.user.id, data);
        return { success: true };
      }),
    delete: protectedProcedure
      .input(z.object({ itemId: z.number() }))
      .mutation(async ({ ctx, input }) => {
        await deleteItineraryItem(input.itemId, ctx.user.id);
        return { success: true };
      }),
  }),

  // ─── DNA Engine ───────────────────────────────────────────────────────────────
  dna: router({
    getResult: protectedProcedure.query(async ({ ctx }) => getQuickDnaResult(ctx.user.id)),
    saveSwipeResult: protectedProcedure
      .input(z.object({
        adventureCount: z.number().default(0),
        cultureCount: z.number().default(0),
        foodCount: z.number().default(0),
        natureCount: z.number().default(0),
        luxuryCount: z.number().default(0),
        urbanCount: z.number().default(0),
        beachCount: z.number().default(0),
        nightlifeCount: z.number().default(0),
        wellnessCount: z.number().default(0),
        historyCount: z.number().default(0),
        familyCount: z.number().default(0),
      }))
      .mutation(async ({ ctx, input }) => {
        const total = Object.values(input).reduce((s, v) => s + v, 0) || 1;
        const score = (count: number) => Math.round((count / total) * 100);
        await upsertQuickDnaResult({
          userId: ctx.user.id,
          ...input,
          explorerScore: score(input.adventureCount + input.urbanCount),
          relaxerScore: score(input.wellnessCount + input.beachCount),
          adventurerScore: score(input.adventureCount + input.natureCount),
          culturalistScore: score(input.cultureCount + input.historyCount),
          foodieScore: score(input.foodCount),
          photographerScore: score(input.cultureCount + input.natureCount),
          historianScore: score(input.historyCount),
          naturalistScore: score(input.natureCount),
        });
        return { success: true };
      }),
  }),

  // ─── Trip Reflections ─────────────────────────────────────────────────────────
  reflections: router({
    get: protectedProcedure
      .input(z.object({ tripId: z.number() }))
      .query(async ({ ctx, input }) => getTripReflection(input.tripId, ctx.user.id)),
    save: protectedProcedure
      .input(z.object({
        tripId: z.number(),
        overallRating: z.number().min(1).max(5).optional(),
        highlights: z.string().optional(),
        lowlights: z.string().optional(),
        wouldReturn: z.boolean().optional(),
        notes: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        await upsertTripReflection({ userId: ctx.user.id, xpEarned: 50, ...input });
        return { success: true };
      }),
  }),

  // ─── Conversations ────────────────────────────────────────────────────────────
  conversations: router({
    list: protectedProcedure.query(async ({ ctx }) => getUserConversations(ctx.user.id)),
    create: protectedProcedure
      .input(z.object({ title: z.string().optional(), context: z.string().optional() }))
      .mutation(async ({ ctx, input }) => createConversation({ userId: ctx.user.id, ...input })),
    messages: protectedProcedure
      .input(z.object({ conversationId: z.number() }))
      .query(async ({ ctx, input }) => getConversationMessages(input.conversationId, ctx.user.id)),
    addMessage: protectedProcedure
      .input(z.object({
        conversationId: z.number(),
        role: z.enum(["user","assistant","system"]),
        content: z.string().min(1),
      }))
      .mutation(async ({ ctx, input }) => createMessage({ userId: ctx.user.id, ...input })),
  }),

  // ─── Support ──────────────────────────────────────────────────────────────────
  support: router({
    list: protectedProcedure.query(async ({ ctx }) => getUserSupportTickets(ctx.user.id)),
    create: protectedProcedure
      .input(z.object({
        category: z.enum(["booking","payment","account","technical","feedback","other"]).default("other"),
        subject: z.string().min(1).max(256),
        description: z.string().min(1),
        tripId: z.number().optional(),
      }))
      .mutation(async ({ ctx, input }) => createSupportTicket({ userId: ctx.user.id, ...input })),
    close: protectedProcedure
      .input(z.object({ ticketId: z.number() }))
      .mutation(async ({ ctx, input }) => {
        await updateSupportTicket(input.ticketId, ctx.user.id, { status: "closed" });
        return { success: true };
      }),
  }),

  // ─── Referrals ────────────────────────────────────────────────────────────────
  referrals: router({
    list: protectedProcedure.query(async ({ ctx }) => getUserReferrals(ctx.user.id)),
    create: protectedProcedure
      .input(z.object({ referralCode: z.string().min(4).max(16) }))
      .mutation(async ({ ctx, input }) => {
        const existing = await getReferralByCode(input.referralCode);
        if (existing) throw new Error("Referral code already exists");
        return createReferral({ referrerId: ctx.user.id, ...input });
      }),
    redeem: protectedProcedure
      .input(z.object({ code: z.string().min(4).max(16) }))
      .mutation(async ({ ctx, input }) => {
        const referral = await getReferralByCode(input.code);
        if (!referral || referral.status !== "pending") throw new Error("Invalid or expired code");
        return { success: true, referrerId: referral.referrerId };
      }),
  }),

  // ─── Social ───────────────────────────────────────────────────────────────────
  social: router({
    connections: protectedProcedure.query(async ({ ctx }) => getUserConnections(ctx.user.id)),
    connect: protectedProcedure
      .input(z.object({ receiverId: z.number(), compatibilityScore: z.number().optional() }))
      .mutation(async ({ ctx, input }) => createSocialConnection({ requesterId: ctx.user.id, ...input })),
    respond: protectedProcedure
      .input(z.object({ connectionId: z.number(), accept: z.boolean() }))
      .mutation(async ({ ctx, input }) => {
        await updateSocialConnection(input.connectionId, { status: input.accept ? "accepted" : "declined" });
        return { success: true };
      }),
    messages: protectedProcedure
      .input(z.object({ partnerId: z.number() }))
      .query(async ({ ctx, input }) => getSocialMessages(ctx.user.id, input.partnerId)),
    sendMessage: protectedProcedure
      .input(z.object({ receiverId: z.number(), content: z.string().min(1).max(1000), tripId: z.number().optional() }))
      .mutation(async ({ ctx, input }) => createSocialMessage({ senderId: ctx.user.id, ...input })),
  }),

  // ─── Real Estate ──────────────────────────────────────────────────────────────
  realEstate: router({
    properties: publicProcedure
      .input(z.object({ city: z.string().optional(), featured: z.boolean().optional() }).optional())
      .query(async ({ input }) => getProperties(input ?? undefined)),
    property: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => getPropertyById(input.id)),
    contacts: publicProcedure
      .input(z.object({ city: z.string().optional() }).optional())
      .query(async ({ input }) => getReContacts(input?.city)),
  }),

  // ─── Enterprise / Revenue ─────────────────────────────────────────────────────
  enterprise: router({
    metrics: protectedProcedure.query(async () => getEnterpriseMetrics(12)),
    upsertMetric: protectedProcedure
      .input(z.object({
        period: z.string().min(6).max(8),
        mrr: z.number().optional(),
        arr: z.number().optional(),
        newUsers: z.number().optional(),
        activeUsers: z.number().optional(),
        churnRate: z.number().optional(),
        cac: z.number().optional(),
        clv: z.number().optional(),
        bookingsCount: z.number().optional(),
        bookingsRevenue: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        await upsertEnterpriseMetric(input as Parameters<typeof upsertEnterpriseMetric>[0]);
        return { success: true };
      }),
    prospects: protectedProcedure.query(async () => getProspects()),
    createProspect: protectedProcedure
      .input(z.object({
        companyName: z.string().min(1).max(128),
        contactName: z.string().optional(),
        email: z.string().optional(),
        phone: z.string().optional(),
        dealValue: z.number().optional(),
        industry: z.string().optional(),
        country: z.string().optional(),
        notes: z.string().optional(),
      }))
      .mutation(async ({ input }) => createProspect(input)),
    updateProspect: protectedProcedure
      .input(z.object({
        id: z.number(),
        status: z.enum(["lead","qualified","proposal","negotiation","closed_won","closed_lost"]).optional(),
        notes: z.string().optional(),
        dealValue: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        await updateProspect(id, data);
        return { success: true };
      }),
  }),

  // ─  // ─── Stripe Payments ─────────────────────────────────────────────
  payments: router({
    createCheckout: protectedProcedure
      .input(z.object({
        priceId: z.string(),
        successUrl: z.string(),
        cancelUrl: z.string(),
      }))
      .mutation(async ({ ctx, input }) => {
        const { createCheckoutSession } = await import("./stripe");
        const session = await createCheckoutSession({
          userId: String(ctx.user.id),
          priceId: input.priceId,
          successUrl: input.successUrl,
          cancelUrl: input.cancelUrl,
          customerEmail: ctx.user.email ?? undefined,
        });
        return { url: session.url, sessionId: session.id };
      }),
    createPaymentIntent: protectedProcedure
      .input(z.object({
        amount: z.number(),
        description: z.string(),
        metadata: z.record(z.string(), z.string()).optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const { createPaymentIntent } = await import("./stripe");
        const intent = await createPaymentIntent({
          amount: input.amount,
          userId: String(ctx.user.id),
          description: input.description,
          metadata: input.metadata as Record<string, string> | undefined,
        });
        return { clientSecret: intent.client_secret, intentId: intent.id };
      }),
  }),

  // ─── User Preferences ─────────────────────────────────────────────
  preferences: router({
    get: protectedProcedure.query(async ({ ctx }) => getUserPreferences(ctx.user.id)),
    update: protectedProcedure
      .input(z.object({
        language: z.string().optional(),
        currency: z.string().optional(),
        notificationsEnabled: z.boolean().optional(),
        darkMode: z.boolean().optional(),
        biometricAuth: z.boolean().optional(),
        marketingEmails: z.boolean().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        await upsertUserPreferences({ userId: ctx.user.id, ...input });
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
