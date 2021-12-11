CREATE TABLE "rocketjaket"."transaction" ("invoice_number" text NOT NULL, "user_id" uuid NOT NULL, "total_transaction" integer NOT NULL, "payment_type" text NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("invoice_number") );
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
CREATE TRIGGER "set_rocketjaket_transaction_updated_at"
BEFORE UPDATE ON "rocketjaket"."transaction"
FOR EACH ROW
EXECUTE PROCEDURE "rocketjaket"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_rocketjaket_transaction_updated_at" ON "rocketjaket"."transaction" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
