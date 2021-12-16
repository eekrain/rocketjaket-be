alter table "rocketjaket"."transaction"
  add constraint "transaction_store_id_fkey"
  foreign key ("store_id")
  references "rocketjaket"."store"
  ("id") on update restrict on delete restrict;
