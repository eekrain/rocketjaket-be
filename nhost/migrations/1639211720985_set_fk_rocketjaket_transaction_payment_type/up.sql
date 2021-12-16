alter table "rocketjaket"."transaction"
  add constraint "transaction_payment_type_fkey"
  foreign key ("payment_type")
  references "rocketjaket"."transaction_payment_type_enum"
  ("payment_type") on update restrict on delete restrict;
