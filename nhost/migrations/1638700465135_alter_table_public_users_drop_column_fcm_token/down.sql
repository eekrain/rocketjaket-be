alter table "public"."users" alter column "fcm_token" drop not null;
alter table "public"."users" add column "fcm_token" text;
