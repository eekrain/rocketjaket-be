CREATE TABLE "rocketjaket"."product" ("id" serial NOT NULL, "product_category_id" integer NOT NULL, "name" text NOT NULL, "photo_url" text, "capital_price" integer NOT NULL, "selling_price" integer NOT NULL, "discount" integer NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("id") , FOREIGN KEY ("product_category_id") REFERENCES "rocketjaket"."product_category"("id") ON UPDATE restrict ON DELETE restrict);
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
CREATE TRIGGER "set_rocketjaket_product_updated_at"
BEFORE UPDATE ON "rocketjaket"."product"
FOR EACH ROW
EXECUTE PROCEDURE "rocketjaket"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_rocketjaket_product_updated_at" ON "rocketjaket"."product" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
