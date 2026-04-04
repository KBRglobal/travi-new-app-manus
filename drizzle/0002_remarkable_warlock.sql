CREATE TYPE "public"."connection_status" AS ENUM('pending', 'accepted', 'declined', 'blocked');--> statement-breakpoint
CREATE TYPE "public"."property_type" AS ENUM('apartment', 'villa', 'penthouse', 'townhouse', 'studio');--> statement-breakpoint
CREATE TYPE "public"."prospect_status" AS ENUM('lead', 'qualified', 'proposal', 'negotiation', 'closed_won', 'closed_lost');--> statement-breakpoint
CREATE TYPE "public"."re_contact_type" AS ENUM('agent', 'developer', 'lawyer', 'consultant');--> statement-breakpoint
CREATE TABLE "enterprise_metrics" (
	"id" serial PRIMARY KEY NOT NULL,
	"period" varchar(8) NOT NULL,
	"mrr" integer DEFAULT 0 NOT NULL,
	"arr" integer DEFAULT 0 NOT NULL,
	"newUsers" integer DEFAULT 0 NOT NULL,
	"activeUsers" integer DEFAULT 0 NOT NULL,
	"churnRate" integer DEFAULT 0,
	"cac" integer DEFAULT 0,
	"clv" integer DEFAULT 0,
	"bookingsCount" integer DEFAULT 0 NOT NULL,
	"bookingsRevenue" integer DEFAULT 0 NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "properties" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(256) NOT NULL,
	"type" "property_type" DEFAULT 'apartment' NOT NULL,
	"city" varchar(128) NOT NULL,
	"country" varchar(64) NOT NULL,
	"priceUsd" integer NOT NULL,
	"bedrooms" integer DEFAULT 1 NOT NULL,
	"bathrooms" integer DEFAULT 1 NOT NULL,
	"sqm" integer,
	"roiPercent" integer DEFAULT 0,
	"rentalYieldPercent" integer DEFAULT 0,
	"description" text,
	"photos" text,
	"amenities" text,
	"developer" varchar(128),
	"handoverDate" varchar(16),
	"featured" boolean DEFAULT false NOT NULL,
	"active" boolean DEFAULT true NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "prospects" (
	"id" serial PRIMARY KEY NOT NULL,
	"companyName" varchar(128) NOT NULL,
	"contactName" varchar(128),
	"email" varchar(128),
	"phone" varchar(32),
	"status" "prospect_status" DEFAULT 'lead' NOT NULL,
	"dealValue" integer DEFAULT 0,
	"industry" varchar(64),
	"country" varchar(64),
	"notes" text,
	"assignedTo" integer,
	"nextFollowUp" timestamp,
	"closedAt" timestamp,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "re_contacts" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(128) NOT NULL,
	"type" "re_contact_type" NOT NULL,
	"company" varchar(128),
	"city" varchar(64),
	"country" varchar(64),
	"phone" varchar(32),
	"email" varchar(128),
	"languages" text,
	"specialties" text,
	"rating" integer DEFAULT 0,
	"reviewCount" integer DEFAULT 0 NOT NULL,
	"verified" boolean DEFAULT false NOT NULL,
	"photoUrl" varchar(512),
	"bio" text,
	"active" boolean DEFAULT true NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "social_connections" (
	"id" serial PRIMARY KEY NOT NULL,
	"requesterId" integer NOT NULL,
	"receiverId" integer NOT NULL,
	"status" "connection_status" DEFAULT 'pending' NOT NULL,
	"compatibilityScore" integer DEFAULT 0,
	"sharedDestinations" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "social_messages" (
	"id" serial PRIMARY KEY NOT NULL,
	"senderId" integer NOT NULL,
	"receiverId" integer NOT NULL,
	"content" text NOT NULL,
	"read" boolean DEFAULT false NOT NULL,
	"tripId" integer,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "isGuest" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "guestToken" varchar(255);