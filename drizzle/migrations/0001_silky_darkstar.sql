CREATE TABLE IF NOT EXISTS "airbnb-be"."rooms" (
	"id" serial PRIMARY KEY NOT NULL,
	"room_name" varchar,
	"room_price" varchar,
	"room_description" varchar,
	"created_at" timestamp with time zone DEFAULT now(),
	"password" text,
	"user_id" integer NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "airbnb-be"."rooms" ADD CONSTRAINT "rooms_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "airbnb-be"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
