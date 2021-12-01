alter table "public"."users"
  add constraint "users_store_id_fkey"
  foreign key ("store_id")
  references "rocketjaket"."store"
  ("id") on update restrict on delete restrict;
