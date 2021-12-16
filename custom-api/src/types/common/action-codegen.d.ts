type Maybe<T> = T | null;

type uuid = string;

type timestamptz = string;

enum InsertTransactionConstraint {
  transaction_pkey = "transaction_pkey",
}

enum InsertTransactionUpdateColumn {
  created_at = "created_at",
  invoice_number = "invoice_number",
  payment_type = "payment_type",
  total_transaction = "total_transaction",
  updated_at = "updated_at",
  user_id = "user_id",
}

enum InsertTransactionItemConstraint {
  transaction_item_pkey = "transaction_item_pkey",
}

enum InsertTransactionItemUpdateColumn {
  created_at = "created_at",
  discount = "discount",
  id = "id",
  price = "price",
  product_name = "product_name",
  purchase_qty = "purchase_qty",
  subtotal = "subtotal",
  transaction_invoice_number = "transaction_invoice_number",
  updated_at = "updated_at",
  variant = "variant",
}

enum createTransactionRocketjaketTransactionItemConstraint {
  transaction_item_pkey = "transaction_item_pkey",
}

enum createTransactionRocketjaketTransactionItemUpdateColumn {
  created_at = "created_at",
  discount = "discount",
  id = "id",
  price = "price",
  product_name = "product_name",
  purchase_qty = "purchase_qty",
  subtotal = "subtotal",
  transaction_invoice_number = "transaction_invoice_number",
  updated_at = "updated_at",
  variant = "variant",
}

enum createTransactionRocketjaketTransactionConstraint {
  transaction_pkey = "transaction_pkey",
}

enum createTransactionRocketjaketTransactionUpdateColumn {
  created_at = "created_at",
  invoice_number = "invoice_number",
  payment_type = "payment_type",
  total_transaction = "total_transaction",
  updated_at = "updated_at",
  user_id = "user_id",
}

enum TransactionPaymentTypeEnum {
  CASH = "CASH",
  EDC_BCA = "EDC_BCA",
  EDC_BRI = "EDC_BRI",
  EDC_MANDIRI = "EDC_MANDIRI",
  EWALLET_GOPAY = "EWALLET_GOPAY",
  EWALLET_LINKAJA = "EWALLET_LINKAJA",
  EWALLET_SHOPEEPAY = "EWALLET_SHOPEEPAY",
}

enum TransactionStatusEnum {
  failed = "failed",
  refund = "refund",
  refund_part = "refund_part",
  success = "success",
}

enum TransactionReceiptTypeEnum {
  email = "email",
  whatsapp = "whatsapp",
}

type InventoryVariantMetadataInsertInput = {
  variant_title?: Maybe<string>;
  variant_value?: Maybe<string>;
};

type SampleInput = {
  username: string;
  password: string;
};

type SignupCredentials = {
  email: string;
  password: string;
};

type InventoryVariantMetadataNeedUpdateInput = {
  id: number;
  variant_value?: Maybe<string>;
};

type update_inventory_product = {
  available_qty?: Maybe<number>;
  min_available_qty?: Maybe<number>;
  product_id: uuid;
  override_selling_price?: Maybe<number>;
  override_discount?: Maybe<number>;
  override_capital_price?: Maybe<number>;
};

type insert_inventory_product_variants = {
  inventory_product_id?: Maybe<uuid>;
  inventory_variant_metadata_id?: Maybe<number>;
};

type insert_update_inventory_product = {
  inventory_product_id?: Maybe<uuid>;
  inventory_variant_metadata_id?: Maybe<number>;
};

type InsertTransactionInput = {
  created_at?: Maybe<timestamptz>;
  invoice_number?: Maybe<string>;
  payment_type?: Maybe<string>;
  total_transaction?: Maybe<number>;
  transaction_items?: Maybe<InsertTransactionItemArrRelInsertInput>;
  updated_at?: Maybe<timestamptz>;
  user_id?: Maybe<uuid>;
};

type InsertTransactionItemArrRelInsertInput = {
  data: Array<InsertTransactionItemInsertInput>;
  on_conflict?: Maybe<InsertTransactionItemOnConflict>;
};

type InsertTransactionItemInsertInput = {
  created_at?: Maybe<timestamptz>;
  discount?: Maybe<number>;
  id?: Maybe<uuid>;
  price?: Maybe<number>;
  product_name?: Maybe<string>;
  purchase_qty?: Maybe<number>;
  subtotal?: Maybe<number>;
  transaction?: Maybe<InsertTransactionObjRelInsertInput>;
  transaction_invoice_number?: Maybe<string>;
  updated_at?: Maybe<timestamptz>;
  variant?: Maybe<string>;
};

type InsertTransactionObjRelInsertInput = {
  data: InsertTransactionInput;
  on_conflict?: Maybe<InsertTransactionOnConflict>;
};

type InsertTransactionOnConflict = {
  constraint: InsertTransactionConstraint;
  update_columns: Array<InsertTransactionUpdateColumn>;
  where?: Maybe<InsertTransactionBoolExp>;
};

type InsertTransactionBoolExp = {
  _and: Array<InsertTransactionBoolExp>;
  _not?: Maybe<InsertTransactionBoolExp>;
  _or: Array<InsertTransactionBoolExp>;
  created_at?: Maybe<MyMutationTimestamptzComparisonExp>;
  invoice_number?: Maybe<MyMutationStringComparisonExp>;
  payment_type?: Maybe<MyMutationStringComparisonExp>;
  total_transaction?: Maybe<MyMutationIntComparisonExp>;
  transaction_items?: Maybe<InsertTransactionItemBoolExp>;
  updated_at?: Maybe<MyMutationTimestamptzComparisonExp>;
  user_id?: Maybe<MyMutationUuidComparisonExp>;
};

type MyMutationTimestamptzComparisonExp = {
  _eq?: Maybe<timestamptz>;
  _gt?: Maybe<timestamptz>;
  _gte?: Maybe<timestamptz>;
  _in: Array<timestamptz>;
  _is_null?: Maybe<boolean>;
  _lt?: Maybe<timestamptz>;
  _lte?: Maybe<timestamptz>;
  _neq?: Maybe<timestamptz>;
  _nin: Array<timestamptz>;
};

type MyMutationStringComparisonExp = {
  _eq?: Maybe<string>;
  _gt?: Maybe<string>;
  _gte?: Maybe<string>;
  _ilike?: Maybe<string>;
  _in: Array<string>;
  _iregex?: Maybe<string>;
  _is_null?: Maybe<boolean>;
  _like?: Maybe<string>;
  _lt?: Maybe<string>;
  _lte?: Maybe<string>;
  _neq?: Maybe<string>;
  _nilike?: Maybe<string>;
  _nin: Array<string>;
  _niregex?: Maybe<string>;
  _nlike?: Maybe<string>;
  _nregex?: Maybe<string>;
  _nsimilar?: Maybe<string>;
  _regex?: Maybe<string>;
  _similar?: Maybe<string>;
};

type MyMutationIntComparisonExp = {
  _eq?: Maybe<number>;
  _gt?: Maybe<number>;
  _gte?: Maybe<number>;
  _in: Array<number>;
  _is_null?: Maybe<boolean>;
  _lt?: Maybe<number>;
  _lte?: Maybe<number>;
  _neq?: Maybe<number>;
  _nin: Array<number>;
};

type InsertTransactionItemBoolExp = {
  _and: Array<InsertTransactionItemBoolExp>;
  _not?: Maybe<InsertTransactionItemBoolExp>;
  _or: Array<InsertTransactionItemBoolExp>;
  created_at?: Maybe<MyMutationTimestamptzComparisonExp>;
  discount?: Maybe<MyMutationIntComparisonExp>;
  id?: Maybe<MyMutationUuidComparisonExp>;
  price?: Maybe<MyMutationIntComparisonExp>;
  product_name?: Maybe<MyMutationStringComparisonExp>;
  purchase_qty?: Maybe<MyMutationIntComparisonExp>;
  subtotal?: Maybe<MyMutationIntComparisonExp>;
  transaction?: Maybe<InsertTransactionBoolExp>;
  transaction_invoice_number?: Maybe<MyMutationStringComparisonExp>;
  updated_at?: Maybe<MyMutationTimestamptzComparisonExp>;
  variant?: Maybe<MyMutationStringComparisonExp>;
};

type MyMutationUuidComparisonExp = {
  _eq?: Maybe<uuid>;
  _gt?: Maybe<uuid>;
  _gte?: Maybe<uuid>;
  _in: Array<uuid>;
  _is_null?: Maybe<boolean>;
  _lt?: Maybe<uuid>;
  _lte?: Maybe<uuid>;
  _neq?: Maybe<uuid>;
  _nin: Array<uuid>;
};

type InsertTransactionItemOnConflict = {
  constraint: InsertTransactionItemConstraint;
  update_columns: Array<InsertTransactionItemUpdateColumn>;
  where?: Maybe<InsertTransactionItemBoolExp>;
};

type createTransaction_TransactionItemInsertInput = {
  created_at?: Maybe<timestamptz>;
  discount?: Maybe<number>;
  id?: Maybe<uuid>;
  price?: Maybe<number>;
  product_name?: Maybe<string>;
  purchase_qty?: Maybe<number>;
  subtotal?: Maybe<number>;
  transaction?: Maybe<createTransactionRocketjaketTransactionObjRelInsertInput>;
  transaction_invoice_number?: Maybe<string>;
  updated_at?: Maybe<timestamptz>;
  variant?: Maybe<string>;
};

type createTransactionRocketjaketTransactionObjRelInsertInput = {
  data: createTransactionRocketjaketTransactionInsertInput;
  on_conflict?: Maybe<createTransactionRocketjaketTransactionOnConflict>;
};

type createTransactionRocketjaketTransactionInsertInput = {
  created_at?: Maybe<timestamptz>;
  invoice_number?: Maybe<string>;
  payment_type?: Maybe<string>;
  total_transaction?: Maybe<number>;
  transaction_items?: Maybe<createTransactionRocketjaketTransactionItemArrRelInsertInput>;
  updated_at?: Maybe<timestamptz>;
  user_id?: Maybe<uuid>;
};

type createTransactionRocketjaketTransactionItemArrRelInsertInput = {
  data: Array<createTransaction_TransactionItemInsertInput>;
  on_conflict?: Maybe<createTransactionRocketjaketTransactionItemOnConflict>;
};

type createTransactionRocketjaketTransactionItemOnConflict = {
  constraint: createTransactionRocketjaketTransactionItemConstraint;
  update_columns: Array<createTransactionRocketjaketTransactionItemUpdateColumn>;
  where?: Maybe<createTransactionRocketjaketTransactionItemBoolExp>;
};

type createTransactionRocketjaketTransactionItemBoolExp = {
  _and: Array<createTransactionRocketjaketTransactionItemBoolExp>;
  _not?: Maybe<createTransactionRocketjaketTransactionItemBoolExp>;
  _or: Array<createTransactionRocketjaketTransactionItemBoolExp>;
  created_at?: Maybe<createTransactionTimestamptzComparisonExp>;
  discount?: Maybe<createTransactionIntComparisonExp>;
  id?: Maybe<createTransactionUuidComparisonExp>;
  price?: Maybe<createTransactionIntComparisonExp>;
  product_name?: Maybe<createTransactionStringComparisonExp>;
  purchase_qty?: Maybe<createTransactionIntComparisonExp>;
  subtotal?: Maybe<createTransactionIntComparisonExp>;
  transaction?: Maybe<createTransactionRocketjaketTransactionBoolExp>;
  transaction_invoice_number?: Maybe<createTransactionStringComparisonExp>;
  updated_at?: Maybe<createTransactionTimestamptzComparisonExp>;
  variant?: Maybe<createTransactionStringComparisonExp>;
};

type createTransactionTimestamptzComparisonExp = {
  _eq?: Maybe<timestamptz>;
  _gt?: Maybe<timestamptz>;
  _gte?: Maybe<timestamptz>;
  _in: Array<timestamptz>;
  _is_null?: Maybe<boolean>;
  _lt?: Maybe<timestamptz>;
  _lte?: Maybe<timestamptz>;
  _neq?: Maybe<timestamptz>;
  _nin: Array<timestamptz>;
};

type createTransactionIntComparisonExp = {
  _eq?: Maybe<number>;
  _gt?: Maybe<number>;
  _gte?: Maybe<number>;
  _in: Array<number>;
  _is_null?: Maybe<boolean>;
  _lt?: Maybe<number>;
  _lte?: Maybe<number>;
  _neq?: Maybe<number>;
  _nin: Array<number>;
};

type createTransactionUuidComparisonExp = {
  _eq?: Maybe<uuid>;
  _gt?: Maybe<uuid>;
  _gte?: Maybe<uuid>;
  _in: Array<uuid>;
  _is_null?: Maybe<boolean>;
  _lt?: Maybe<uuid>;
  _lte?: Maybe<uuid>;
  _neq?: Maybe<uuid>;
  _nin: Array<uuid>;
};

type createTransactionStringComparisonExp = {
  _eq?: Maybe<string>;
  _gt?: Maybe<string>;
  _gte?: Maybe<string>;
  _ilike?: Maybe<string>;
  _in: Array<string>;
  _iregex?: Maybe<string>;
  _is_null?: Maybe<boolean>;
  _like?: Maybe<string>;
  _lt?: Maybe<string>;
  _lte?: Maybe<string>;
  _neq?: Maybe<string>;
  _nilike?: Maybe<string>;
  _nin: Array<string>;
  _niregex?: Maybe<string>;
  _nlike?: Maybe<string>;
  _nregex?: Maybe<string>;
  _nsimilar?: Maybe<string>;
  _regex?: Maybe<string>;
  _similar?: Maybe<string>;
};

type createTransactionRocketjaketTransactionBoolExp = {
  _and: Array<createTransactionRocketjaketTransactionBoolExp>;
  _not?: Maybe<createTransactionRocketjaketTransactionBoolExp>;
  _or: Array<createTransactionRocketjaketTransactionBoolExp>;
  created_at?: Maybe<createTransactionTimestamptzComparisonExp>;
  invoice_number?: Maybe<createTransactionStringComparisonExp>;
  payment_type?: Maybe<createTransactionStringComparisonExp>;
  total_transaction?: Maybe<createTransactionIntComparisonExp>;
  transaction_items?: Maybe<createTransactionRocketjaketTransactionItemBoolExp>;
  updated_at?: Maybe<createTransactionTimestamptzComparisonExp>;
  user_id?: Maybe<createTransactionUuidComparisonExp>;
};

type createTransactionRocketjaketTransactionOnConflict = {
  constraint: createTransactionRocketjaketTransactionConstraint;
  update_columns: Array<createTransactionRocketjaketTransactionUpdateColumn>;
  where?: Maybe<createTransactionRocketjaketTransactionBoolExp>;
};

type transaction_items = {
  product_inventory_id: uuid;
  product_name: string;
  variant: string;
  capital_price: number;
  selling_price: number;
  discount: number;
  purchace_qty: number;
  inventory_product_updated_at: string;
  product_updated_at: string;
};

type CustomerInput = {
  id?: Maybe<uuid>;
  email?: Maybe<string>;
  name?: Maybe<string>;
  phone_number?: Maybe<string>;
};

type BulkUpdateVariantsMetadataOutput = {
  variant_title?: Maybe<string>;
  is_any_update?: Maybe<boolean>;
};

type SampleOutput = {
  isSuccess: boolean;
};

type User = {
  id: number;
  email: string;
};

type bulkUpdateInventoryProductOutput = {
  insert_inventory_product_variants_affected_rows?: Maybe<number>;
  inventory_product_name?: Maybe<string>;
};

type createTransactionOutput = {
  isOutOfSync?: Maybe<boolean>;
  invoice_number?: Maybe<string>;
  total_transaction: number;
  cash_change?: Maybe<number>;
  cash_in_amount: number;
  payment_type: string;
  store_id: number;
  transaction_status: TransactionStatusEnum;
};

type MyMutationOutput = {
  email?: Maybe<string>;
  id: uuid;
  name?: Maybe<string>;
  phone_number?: Maybe<string>;
};

type sendReceiptOutput = {
  email?: Maybe<string>;
  id: uuid;
  name?: Maybe<string>;
  phone_number?: Maybe<string>;
  created_at: timestamptz;
  is_sent: boolean;
};

type getWhatsappAuthStatusOutput = {
  is_authenticated: boolean;
  qr_code?: Maybe<string>;
  client_state?: Maybe<string>;
  client_name?: Maybe<string>;
  client_phone_number?: Maybe<string>;
  client_platform?: Maybe<string>;
  client_device_manufacturer?: Maybe<string>;
  client_device_model?: Maybe<string>;
};

type whatsappSignoutOutput = {
  is_success: boolean;
};

type refundTransactionOutput = {
  invoice_number: string;
  is_success: boolean;
};

type Query = {
  getWhatsappAuthStatus?: Maybe<getWhatsappAuthStatusOutput>;
};

type Mutation = {
  bulkUpdateInventoryProduct?: Maybe<bulkUpdateInventoryProductOutput>;
  bulkUpdateVariantsMetadata?: Maybe<BulkUpdateVariantsMetadataOutput>;
  createTransaction?: Maybe<createTransactionOutput>;
  refundTransaction?: Maybe<refundTransactionOutput>;
  sendReceipt?: Maybe<sendReceiptOutput>;
  whatsappSignout?: Maybe<whatsappSignoutOutput>;
};

type getWhatsappAuthStatusArgs = {};

type bulkUpdateInventoryProductArgs = {
  inventory_product_id: uuid;
  set_inventory_product: update_inventory_product;
  insert_update_inventory_product: Array<insert_inventory_product_variants>;
};

type bulkUpdateVariantsMetadataArgs = {
  old_variant_title: string;
  new_variant_title: string;
  needDeleteIds: Array<number>;
  needAddVariantMetadata: Array<InventoryVariantMetadataInsertInput>;
  needUpdateVariantMetadata: Array<InventoryVariantMetadataNeedUpdateInput>;
};

type createTransactionArgs = {
  user_id: uuid;
  payment_type: TransactionPaymentTypeEnum;
  total_transaction: number;
  cash_in_amount: number;
  transaction_items: Array<transaction_items>;
  store_id: number;
};

type refundTransactionArgs = {
  invoice_number: string;
  isRefundAll: boolean;
  refund_reason: string;
};

type sendReceiptArgs = {
  customer?: Maybe<CustomerInput>;
  receipt_type: TransactionReceiptTypeEnum;
  invoice_number: string;
};

type whatsappSignoutArgs = {};
