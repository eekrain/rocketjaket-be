alter table "rocketjaket"."inventory_product_variant"
  add constraint "inventory_product_variant_inventory_variant_metadata_id_fkey"
  foreign key ("inventory_variant_metadata_id")
  references "rocketjaket"."inventory_variant_metadata"
  ("id") on update restrict on delete restrict;
