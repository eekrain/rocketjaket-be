CREATE TABLE "rocketjaket"."notification" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "notification_title" text NOT NULL, "notification_body" text NOT NULL, PRIMARY KEY ("id") );
CREATE EXTENSION IF NOT EXISTS pgcrypto;
