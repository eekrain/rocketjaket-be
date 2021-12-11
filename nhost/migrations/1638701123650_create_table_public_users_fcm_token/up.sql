CREATE TABLE "public"."users_fcm_token" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "user_id" uuid NOT NULL, "fcm_token" text NOT NULL, PRIMARY KEY ("id") , UNIQUE ("fcm_token"));
CREATE EXTENSION IF NOT EXISTS pgcrypto;
