import { Request, Response } from "express";
import {
  bulkUpdateInventoryProductArgs,
  bulkUpdateInventoryProductOutput,
} from "src/types/handlers";
import { getMySdk } from "../utils";
// Request Handler

const handler = async (req: Request, res: Response) => {
  const params: bulkUpdateInventoryProductArgs = req.body.input;
  console.log(
    "🚀 ~ file: bulkUpdateInventoryProduct.ts ~ line 11 ~ handler ~ params",
    params
  );
  const sdk = getMySdk(req);

  const resUpdateInventoryProduct =
    await sdk.Inventory_UpdateInventoryProductByPK({
      id: params.inventory_product_id,
      product_id: params.set_inventory_product.product_id,
      available_qty: params.set_inventory_product.available_qty,
      min_available_qty: params.set_inventory_product.min_available_qty,
      override_capital_price:
        params.set_inventory_product.override_capital_price,
      override_selling_price:
        params.set_inventory_product.override_selling_price,
      override_discount: params.set_inventory_product.override_discount,
    });

  const resDeleteInventoryProductVariants =
    await sdk.Inventory_BulkDeleteInventoryProductVariantById({
      inventory_product_id: params.inventory_product_id,
    });

  const resInsertInventoryProductVariants =
    await sdk.Inventory_CreateInventoryProductVariants({
      insert_rocketjaket_inventory_product_variant:
        params.insert_update_inventory_product,
    });

  // execute the parent operation in Hasura

  const result: bulkUpdateInventoryProductOutput = {
    insert_inventory_product_variants_affected_rows: 0,
    inventory_product_name: "anjing",
  };
  return res.json(result);
};

module.exports = handler;
