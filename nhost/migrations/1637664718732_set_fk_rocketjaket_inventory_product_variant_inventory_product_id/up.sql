alter table "rocketjaket"."inventory_product_variant"
  add constraint "inventory_product_variant_inventory_product_id_fkey"
  foreign key ("inventory_product_id")
  references "rocketjaket"."inventory_product"
  ("id") on update restrict on delete restrict;
