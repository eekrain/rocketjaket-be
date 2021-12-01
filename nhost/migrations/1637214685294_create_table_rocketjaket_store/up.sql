CREATE TABLE "rocketjaket"."store" ("id" serial NOT NULL, "name" text NOT NULL, "address" text, "latitude" text, "longitude" text, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("id") , UNIQUE ("name"));
CREATE OR REPLACE FUNCTION "rocketjaket"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_rocketjaket_store_updated_at"
BEFORE UPDATE ON "rocketjaket"."store"
FOR EACH ROW
EXECUTE PROCEDURE "rocketjaket"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_rocketjaket_store_updated_at" ON "rocketjaket"."store" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
