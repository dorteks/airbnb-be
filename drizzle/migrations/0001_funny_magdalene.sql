DO $$ BEGIN
 CREATE TYPE "role" AS ENUM('user', 'admin');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "airbnb-be"."auth" ADD COLUMN "refresh_token" text;--> statement-breakpoint
ALTER TABLE "airbnb-be"."auth" ADD COLUMN "access_token" varchar;--> statement-breakpoint
ALTER TABLE "airbnb-be"."user" ADD COLUMN "role" "role" DEFAULT 'user' NOT NULL;