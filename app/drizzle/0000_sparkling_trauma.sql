-- Create the app schema
CREATE SCHEMA IF NOT EXISTS "app";

-- Create the logs table
CREATE TABLE IF NOT EXISTS "app"."logs" (
	"id" serial PRIMARY KEY NOT NULL,
	"table" text NOT NULL,
	"user" text NOT NULL,
	"inserted_at" timestamp with time zone NOT NULL
);

-- Create the session table
CREATE TABLE IF NOT EXISTS "app"."session" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"expires_at" timestamp with time zone NOT NULL
);

-- Create the user table
CREATE TABLE IF NOT EXISTS "app"."user" (
	"id" text PRIMARY KEY NOT NULL,
	"age" integer,
	"username" text NOT NULL,
	"password_hash" text NOT NULL,
	CONSTRAINT "user_username_unique" UNIQUE("username")
);

-- Add foreign key constraint
ALTER TABLE IF EXISTS "app"."session" 
ADD CONSTRAINT "session_user_id_user_id_fk" 
FOREIGN KEY ("user_id") REFERENCES "app"."user"("id") 
ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Create the trigger function in the app schema
CREATE OR REPLACE FUNCTION "app"."log_inserts"()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO "app"."logs" ("table", "user", "inserted_at")
  VALUES (TG_TABLE_NAME, current_user, CURRENT_TIMESTAMP);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER log_user_insert
AFTER INSERT ON "app"."user"
FOR EACH ROW
EXECUTE FUNCTION "app"."log_inserts"();

GRANT USAGE, SELECT ON SEQUENCE "app"."logs_id_seq" TO api, developer, admin;