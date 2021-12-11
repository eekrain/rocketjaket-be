import { Request, Response } from "express";
import { getUserSdk } from "../utils";
// Request Handler

const handler = async (req: Request, res: Response) => {
  const params: bulkUpdateVariantsMetadataArgs = req.body.input;
  // execute the parent operation in Hasura
  const sdk = getUserSdk(req);
  // anjing
  let handlerResponse: any = {};
  const isAnyUpdate: boolean[] = [];

  if (params.needAddVariantMetadata.length > 0) {
    const res = await sdk.Inventory_CreateInventoryVariantMetadata({
      objects: params.needAddVariantMetadata,
    });
    handlerResponse = {
      ...handlerResponse,
      add: {
        data: res.data,
        errors: res.errors,
      },
    };
    isAnyUpdate.push(true);
  }

  if (params.needUpdateVariantMetadata.length > 0) {
    const updateResponse: any[] = [];
    params.needUpdateVariantMetadata.forEach(async (val) => {
      const res = await sdk.Inventory_UpdateOneVariantValueByPK({
        id: val.id,
        variant_value: val.variant_value,
      });
      updateResponse.push({
        data: res.data,
        errors: res.errors,
      });
    });
    handlerResponse = {
      ...handlerResponse,
      update: updateResponse,
    };
    isAnyUpdate.push(true);
  }

  if (params.needDeleteIds.length > 0) {
    const res = await sdk.Inventory_BulkDeleteInventoryVariantByPKs({
      deleteIds: params.needDeleteIds,
    });
    handlerResponse = {
      ...handlerResponse,
      delete: {
        data: res.data,
        errors: res.errors,
      },
    };
    isAnyUpdate.push(true);
  }

  if (params.old_variant_title !== params.new_variant_title) {
    const res = await sdk.Inventory_BulkUpdateInventoryVariantTitle({
      old_variant_title: params.old_variant_title,
      new_variant_title: params.new_variant_title,
    });
    handlerResponse = {
      ...handlerResponse,
      rename: {
        data: res.data,
        errors: res.errors,
      },
    };
    isAnyUpdate.push(true);
  }

  const result: BulkUpdateVariantsMetadataOutput = {
    variant_title: params.new_variant_title,
    is_any_update: isAnyUpdate.length > 0 ? true : false,
  };
  // success
  return res.json(result);
};

module.exports = handler;
