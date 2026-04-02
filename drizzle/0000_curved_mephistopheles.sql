CREATE TYPE "public"."alert_type" AS ENUM('flight', 'hotel', 'package');--> statement-breakpoint
CREATE TYPE "public"."platform" AS ENUM('ios', 'android', 'web');--> statement-breakpoint
CREATE TYPE "public"."role" AS ENUM('user', 'admin');--> statement-breakpoint
CREATE TYPE "public"."trip_status" AS ENUM('planning', 'booked', 'active', 'completed');--> statement-breakpoint
CREATE TABLE "price_alerts" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" integer NOT NULL,
	"destination" varchar(128) NOT NULL,
	"targetPrice" integer NOT NULL,
	"currentPrice" integer DEFAULT 0,
	"type" "alert_type" DEFAULT 'flight' NOT NULL,
	"active" integer DEFAULT 1 NOT NULL,
	"lastChecked" timestamp DEFAULT now(),
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "push_tokens" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" integer NOT NULL,
	"token" varchar(256) NOT NULL,
	"platform" "platform" DEFAULT 'ios' NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "push_tokens_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "traveler_profiles" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" integer NOT NULL,
	"explorerScore" integer DEFAULT 0 NOT NULL,
	"relaxerScore" integer DEFAULT 0 NOT NULL,
	"adventurerScore" integer DEFAULT 0 NOT NULL,
	"culturalistScore" integer DEFAULT 0 NOT NULL,
	"foodieScore" integer DEFAULT 0 NOT NULL,
	"photographerScore" integer DEFAULT 0 NOT NULL,
	"historianScore" integer DEFAULT 0 NOT NULL,
	"naturalistScore" integer DEFAULT 0 NOT NULL,
	"xp" integer DEFAULT 0 NOT NULL,
	"points" integer DEFAULT 0 NOT NULL,
	"quizCompleted" integer DEFAULT 0 NOT NULL,
	"swipeCompleted" integer DEFAULT 0 NOT NULL,
	"preferences" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "traveler_profiles_userId_unique" UNIQUE("userId")
);
--> statement-breakpoint
CREATE TABLE "trips" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" integer NOT NULL,
	"destination" varchar(128) NOT NULL,
	"country" varchar(64),
	"startDate" varchar(16),
	"endDate" varchar(16),
	"status" "trip_status" DEFAULT 'planning' NOT NULL,
	"budget" integer DEFAULT 0,
	"currency" varchar(8) DEFAULT 'USD',
	"itinerary" text,
	"companions" text,
	"expenses" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"openId" varchar(64) NOT NULL,
	"name" text,
	"email" varchar(320),
	"loginMethod" varchar(64),
	"role" "role" DEFAULT 'user' NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"lastSignedIn" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_openId_unique" UNIQUE("openId")
);
