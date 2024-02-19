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
ALTER TABLE "airbnb-be"."user" ADD COLUMN "phone" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "airbnb-be"."rooms" DROP COLUMN IF EXISTS "password";--> statement-breakpoint
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
--> statement-breakpoint
ALTER TABLE "airbnb-be"."user" ADD CONSTRAINT "user_phone_unique" UNIQUE("phone");