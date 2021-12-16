alter table "rocketjaket"."transaction_item"
  add constraint "transaction_item_transaction_status_fkey"
  foreign key ("transaction_status")
  references "rocketjaket"."transaction_status_enum"
  ("transaction_status") on update restrict on delete restrict;
