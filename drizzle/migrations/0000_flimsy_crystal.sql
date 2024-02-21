CREATE SCHEMA "airbnb-be";
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "user_status" AS ENUM('not_verified', 'verified');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "airbnb-be"."auth" (
	"id" serial PRIMARY KEY NOT NULL,
	"password" text,
	"last_ping" timestamp with time zone DEFAULT now(),
	"user_id" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "airbnb-be"."rooms" (
	"id" serial PRIMARY KEY NOT NULL,
	"room_name" varchar,
	"room_price" varchar,
	"room_description" varchar,
	"check_in_at" timestamp with time zone,
	"check-out_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "airbnb-be"."user" (
	"id" serial PRIMARY KEY NOT NULL,
	"first_name" varchar,
	"last_name" varchar,
	"email" varchar(64) NOT NULL,
	"phone" varchar NOT NULL,
	"status" "user_status" DEFAULT 'not_verified',
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "user_email_unique" UNIQUE("email"),
	CONSTRAINT "user_phone_unique" UNIQUE("phone")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "airbnb-be"."verification_code" (
	"id" serial PRIMARY KEY NOT NULL,
	"code" varchar,
	"user_id" integer NOT NULL,
	"expires_at" timestamp with time zone DEFAULT now(),
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "verification_code_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "airbnb-be"."verification_status" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" boolean DEFAULT false,
	"phone" boolean DEFAULT false,
	"user_id" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "email_idx" ON "airbnb-be"."user" ("email");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "airbnb-be"."auth" ADD CONSTRAINT "auth_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "airbnb-be"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "airbnb-be"."verification_code" ADD CONSTRAINT "verification_code_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "airbnb-be"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "airbnb-be"."verification_status" ADD CONSTRAINT "verification_status_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "airbnb-be"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
