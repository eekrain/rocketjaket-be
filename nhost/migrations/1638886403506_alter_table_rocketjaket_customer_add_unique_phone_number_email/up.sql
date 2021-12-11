alter table "rocketjaket"."customer" add constraint "customer_phone_number_email_key" unique ("phone_number", "email");
