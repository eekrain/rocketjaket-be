export type Maybe<T> = T | null;

export type uuid = string;

export type InventoryVariantMetadataInsertInput = {
  variant_title?: Maybe<string>;
  variant_value?: Maybe<string>;
};

export type SampleInput = {
  username: string;
  password: string;
};

export type SignupCredentials = {
  email: string;
  password: string;
};

export type InventoryVariantMetadataNeedUpdateInput = {
  id: number;
  variant_value?: Maybe<string>;
};

export type update_inventory_product = {
  available_qty?: Maybe<number>;
  min_available_qty?: Maybe<number>;
  product_id: uuid;
  override_selling_price?: Maybe<number>;
  override_discount?: Maybe<number>;
  override_capital_price?: Maybe<number>;
};

export type insert_inventory_product_variants = {
  inventory_product_id?: Maybe<uuid>;
  inventory_variant_metadata_id?: Maybe<number>;
};

export type insert_update_inventory_product = {
  inventory_product_id?: Maybe<uuid>;
  inventory_variant_metadata_id?: Maybe<number>;
};

export type BulkUpdateVariantsMetadataOutput = {
  variant_title?: Maybe<string>;
  is_any_update?: Maybe<boolean>;
};

export type SampleOutput = {
  accessToken: string;
};

export type User = {
  id: number;
  email: string;
};

export type bulkUpdateInventoryProductOutput = {
  insert_inventory_product_variants_affected_rows?: Maybe<number>;
  inventory_product_name?: Maybe<string>;
};

export type Mutation = {
  bulkUpdateInventoryProduct?: Maybe<bulkUpdateInventoryProductOutput>;
  bulkUpdateVariantsMetadata?: Maybe<BulkUpdateVariantsMetadataOutput>;
};

export type bulkUpdateInventoryProductArgs = {
  inventory_product_id: uuid;
  set_inventory_product: update_inventory_product;
  insert_update_inventory_product: Array<insert_inventory_product_variants>;
};

export type bulkUpdateVariantsMetadataArgs = {
  old_variant_title: string;
  new_variant_title: string;
  needDeleteIds: Array<number>;
  needAddVariantMetadata: Array<InventoryVariantMetadataInsertInput>;
  needUpdateVariantMetadata: Array<InventoryVariantMetadataNeedUpdateInput>;
};
