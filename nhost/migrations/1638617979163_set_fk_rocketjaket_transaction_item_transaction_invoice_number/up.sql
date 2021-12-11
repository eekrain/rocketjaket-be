alter table "rocketjaket"."transaction_item" drop constraint "transaction_item_transaction_invoice_number_fkey",
  add constraint "transaction_item_transaction_invoice_number_fkey"
  foreign key ("transaction_invoice_number")
  references "rocketjaket"."transaction"
  ("invoice_number") on update restrict on delete cascade;
