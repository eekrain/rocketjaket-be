CREATE TABLE "rocketjaket"."product" ("sku" text NOT NULL, "product_category_id" integer NOT NULL, "name" text NOT NULL, "photo_url" text NOT NULL, "description" text, "capital_price" integer NOT NULL, "selling_price" integer NOT NULL, "discount" integer NOT NULL, PRIMARY KEY ("sku") , FOREIGN KEY ("product_category_id") REFERENCES "rocketjaket"."product_category"("id") ON UPDATE restrict ON DELETE restrict);
