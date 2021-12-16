alter table "rocketjaket"."transaction"
  add constraint "transaction_transaction_status_fkey"
  foreign key ("transaction_status")
  references "rocketjaket"."transaction_status_enum"
  ("transaction_status") on update restrict on delete restrict;
