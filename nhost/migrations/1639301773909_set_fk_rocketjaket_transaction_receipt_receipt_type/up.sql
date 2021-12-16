alter table "rocketjaket"."transaction_receipt"
  add constraint "transaction_receipt_receipt_type_fkey"
  foreign key ("receipt_type")
  references "rocketjaket"."transaction_receipt_type_enum"
  ("receipt_type") on update restrict on delete restrict;
