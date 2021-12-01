CREATE TABLE "rocketjaket"."inventory_variant_metadata" ("id" serial NOT NULL, "variant_title" text NOT NULL, "variant_value" text NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("id") );
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
CREATE TRIGGER "set_rocketjaket_inventory_variant_metadata_updated_at"
BEFORE UPDATE ON "rocketjaket"."inventory_variant_metadata"
FOR EACH ROW
EXECUTE PROCEDURE "rocketjaket"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_rocketjaket_inventory_variant_metadata_updated_at" ON "rocketjaket"."inventory_variant_metadata" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
