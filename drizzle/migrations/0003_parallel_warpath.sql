ALTER TABLE "airbnb-be"."rooms" DROP CONSTRAINT "rooms_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "airbnb-be"."rooms" DROP COLUMN IF EXISTS "user_id";