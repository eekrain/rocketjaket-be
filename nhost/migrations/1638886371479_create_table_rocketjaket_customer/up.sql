CREATE TABLE "rocketjaket"."customer" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "name" text, "phone_number" text NOT NULL, "email" text, PRIMARY KEY ("id") );
CREATE EXTENSION IF NOT EXISTS pgcrypto;
