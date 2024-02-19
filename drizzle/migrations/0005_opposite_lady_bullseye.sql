DO $$ BEGIN
 CREATE TYPE "user_status" AS ENUM('not_verified', 'verified');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "airbnb-be"."auth" ADD COLUMN "last_ping" timestamp with time zone DEFAULT now();--> statement-breakpoint
ALTER TABLE "airbnb-be"."user" ADD COLUMN "status" "user_status" DEFAULT 'not_verified';