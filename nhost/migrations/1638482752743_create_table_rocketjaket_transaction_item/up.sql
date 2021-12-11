CREATE TABLE "rocketjaket"."transaction_item" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "transaction_invoice_number" text NOT NULL, "product_name" text NOT NULL, "variant" text NOT NULL, "price" integer NOT NULL, "discount" integer NOT NULL, "purchase_qty" integer NOT NULL, "subtotal" integer NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("id") , FOREIGN KEY ("transaction_invoice_number") REFERENCES "rocketjaket"."transaction"("invoice_number") ON UPDATE restrict ON DELETE restrict);
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
CREATE TRIGGER "set_rocketjaket_transaction_item_updated_at"
BEFORE UPDATE ON "rocketjaket"."transaction_item"
FOR EACH ROW
EXECUTE PROCEDURE "rocketjaket"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_rocketjaket_transaction_item_updated_at" ON "rocketjaket"."transaction_item" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;
