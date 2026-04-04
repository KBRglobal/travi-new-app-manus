CREATE TYPE "public"."dna_session_type" AS ENUM('quick_quiz', 'quick_swipe', 'first_class');--> statement-breakpoint
CREATE TYPE "public"."itinerary_item_type" AS ENUM('flight', 'hotel', 'activity', 'restaurant', 'transport', 'note');--> statement-breakpoint
CREATE TYPE "public"."learning_event_type" AS ENUM('search', 'view_destination', 'book', 'review', 'share', 'wishlist');--> statement-breakpoint
CREATE TYPE "public"."message_role" AS ENUM('user', 'assistant', 'system');--> statement-breakpoint
CREATE TYPE "public"."referral_status" AS ENUM('pending', 'completed', 'expired');--> statement-breakpoint
CREATE TYPE "public"."ticket_category" AS ENUM('booking', 'payment', 'account', 'technical', 'feedback', 'other');--> statement-breakpoint
CREATE TYPE "public"."ticket_status" AS ENUM('open', 'in_progress', 'resolved', 'closed');--> statement-breakpoint
CREATE TYPE "public"."wallet_tx_type" AS ENUM('credit', 'debit', 'refund', 'commission');--> statement-breakpoint
CREATE TABLE "conversations" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" integer NOT NULL,
	"title" varchar(256),
	"context" text,
	"archived" boolean DEFAULT false NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "dna_sessions" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" integer NOT NULL,
	"type" "dna_session_type" NOT NULL,
	"completed" boolean DEFAULT false NOT NULL,
	"scores" text,
	"rawAnswers" text,
	"xpEarned" integer DEFAULT 0 NOT NULL,
	"completedAt" timestamp,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "first_class_dna_results" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" integer NOT NULL,
	"sessionId" integer,
	"identityScore" integer DEFAULT 0 NOT NULL,
	"crisisScore" integer DEFAULT 0 NOT NULL,
	"moneyScore" integer DEFAULT 0 NOT NULL,
	"visualScore" integer DEFAULT 0 NOT NULL,
	"brandScore" integer DEFAULT 0 NOT NULL,
	"socialScore" integer DEFAULT 0 NOT NULL,
	"sensoryScore" integer DEFAULT 0 NOT NULL,
	"futureScore" integer DEFAULT 0 NOT NULL,
	"aiChallengeScore" integer DEFAULT 0 NOT NULL,
	"travelPersonality" varchar(64),
	"aiInsights" text,
	"completedModules" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "first_class_dna_results_userId_unique" UNIQUE("userId")
);
--> statement-breakpoint
CREATE TABLE "itinerary_items" (
	"id" serial PRIMARY KEY NOT NULL,
	"tripId" integer NOT NULL,
	"userId" integer NOT NULL,
	"type" "itinerary_item_type" NOT NULL,
	"title" varchar(256) NOT NULL,
	"description" text,
	"location" varchar(256),
	"date" varchar(16),
	"startTime" varchar(8),
	"endTime" varchar(8),
	"cost" integer DEFAULT 0,
	"currency" varchar(8) DEFAULT 'USD',
	"bookingRef" varchar(128),
	"confirmed" boolean DEFAULT false NOT NULL,
	"metadata" text,
	"sortOrder" integer DEFAULT 0 NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "learning_events" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" integer NOT NULL,
	"type" "learning_event_type" NOT NULL,
	"entityType" varchar(64),
	"entityId" varchar(128),
	"metadata" text,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "messages" (
	"id" serial PRIMARY KEY NOT NULL,
	"conversationId" integer NOT NULL,
	"userId" integer NOT NULL,
	"role" "message_role" NOT NULL,
	"content" text NOT NULL,
	"metadata" text,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "quick_dna_results" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" integer NOT NULL,
	"sessionId" integer,
	"adventureCount" integer DEFAULT 0 NOT NULL,
	"cultureCount" integer DEFAULT 0 NOT NULL,
	"foodCount" integer DEFAULT 0 NOT NULL,
	"natureCount" integer DEFAULT 0 NOT NULL,
	"luxuryCount" integer DEFAULT 0 NOT NULL,
	"urbanCount" integer DEFAULT 0 NOT NULL,
	"beachCount" integer DEFAULT 0 NOT NULL,
	"nightlifeCount" integer DEFAULT 0 NOT NULL,
	"wellnessCount" integer DEFAULT 0 NOT NULL,
	"historyCount" integer DEFAULT 0 NOT NULL,
	"familyCount" integer DEFAULT 0 NOT NULL,
	"explorerScore" integer DEFAULT 0 NOT NULL,
	"relaxerScore" integer DEFAULT 0 NOT NULL,
	"adventurerScore" integer DEFAULT 0 NOT NULL,
	"culturalistScore" integer DEFAULT 0 NOT NULL,
	"foodieScore" integer DEFAULT 0 NOT NULL,
	"photographerScore" integer DEFAULT 0 NOT NULL,
	"historianScore" integer DEFAULT 0 NOT NULL,
	"naturalistScore" integer DEFAULT 0 NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "quick_dna_results_userId_unique" UNIQUE("userId")
);
--> statement-breakpoint
CREATE TABLE "referrals" (
	"id" serial PRIMARY KEY NOT NULL,
	"referrerId" integer NOT NULL,
	"refereeId" integer,
	"referralCode" varchar(16) NOT NULL,
	"status" "referral_status" DEFAULT 'pending' NOT NULL,
	"pointsEarned" integer DEFAULT 0 NOT NULL,
	"completedAt" timestamp,
	"expiresAt" timestamp,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "referrals_referralCode_unique" UNIQUE("referralCode")
);
--> statement-breakpoint
CREATE TABLE "support_tickets" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" integer NOT NULL,
	"category" "ticket_category" DEFAULT 'other' NOT NULL,
	"subject" varchar(256) NOT NULL,
	"description" text NOT NULL,
	"status" "ticket_status" DEFAULT 'open' NOT NULL,
	"priority" integer DEFAULT 1 NOT NULL,
	"tripId" integer,
	"attachments" text,
	"resolvedAt" timestamp,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "trip_reflections" (
	"id" serial PRIMARY KEY NOT NULL,
	"tripId" integer NOT NULL,
	"userId" integer NOT NULL,
	"overallRating" integer,
	"highlights" text,
	"lowlights" text,
	"wouldReturn" boolean,
	"recommendTo" text,
	"photos" text,
	"notes" text,
	"xpEarned" integer DEFAULT 0 NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_preferences" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" integer NOT NULL,
	"language" varchar(8) DEFAULT 'en' NOT NULL,
	"currency" varchar(8) DEFAULT 'USD' NOT NULL,
	"distanceUnit" varchar(4) DEFAULT 'km' NOT NULL,
	"temperatureUnit" varchar(4) DEFAULT 'C' NOT NULL,
	"notificationsEnabled" boolean DEFAULT true NOT NULL,
	"marketingEmails" boolean DEFAULT false NOT NULL,
	"darkMode" boolean DEFAULT false NOT NULL,
	"biometricAuth" boolean DEFAULT false NOT NULL,
	"twoFactorAuth" boolean DEFAULT false NOT NULL,
	"dataSharing" boolean DEFAULT true NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_preferences_userId_unique" UNIQUE("userId")
);
--> statement-breakpoint
CREATE TABLE "wallet_transactions" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" integer NOT NULL,
	"amount" integer NOT NULL,
	"currency" varchar(8) DEFAULT 'USD' NOT NULL,
	"type" "wallet_tx_type" NOT NULL,
	"description" text,
	"tripId" integer,
	"referenceId" varchar(128),
	"createdAt" timestamp DEFAULT now() NOT NULL
);
