CREATE TABLE "rocketjaket"."inventory_product" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "product_id" uuid NOT NULL, "override_capital_price" integer NOT NULL, "override_selling_price" integer NOT NULL, "override_discount" integer NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("id") , FOREIGN KEY ("product_id") REFERENCES "rocketjaket"."product"("id") ON UPDATE restrict ON DELETE restrict);
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
CREATE TRIGGER "set_rocketjaket_inventory_product_updated_at"
BEFORE UPDATE ON "rocketjaket"."inventory_product"
FOR EACH ROW
EXECUTE PROCEDURE "rocketjaket"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_rocketjaket_inventory_product_updated_at" ON "rocketjaket"."inventory_product" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;
