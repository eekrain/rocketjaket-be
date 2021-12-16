alter table "rocketjaket"."transaction" alter column "status" drop not null;
alter table "rocketjaket"."transaction" add column "status" text;
