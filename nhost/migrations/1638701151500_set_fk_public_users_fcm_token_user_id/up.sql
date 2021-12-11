alter table "public"."users_fcm_token"
  add constraint "users_fcm_token_user_id_fkey"
  foreign key ("user_id")
  references "public"."users"
  ("id") on update restrict on delete restrict;
