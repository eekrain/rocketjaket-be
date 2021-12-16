import { Request, Response } from "express";
import { getAdminSdk, getUserSdk } from "../utils";
import { resTemplates } from "../utils";
import { myFirebaseAdminApp } from "../server";
import { getMessaging } from "firebase-admin/messaging";
import { Rocketjaket_Transaction_Status_Enum_Enum } from "../graphql/gql-generated";

const handler = async (req: Request, res: Response) => {
  const eventData: event_updateAvailableQtyOnRefundTransactionItem =
    req.body.event.data;
  console.log(
    "🚀 ~ file: event_updateAvailableQtyOnInsertTransactionItem.ts ~ line 8 ~ handler ~ eventData",
    eventData
  );

  const sdk = getAdminSdk();

  const inventory_produk = await sdk
    .Inventory_GetInventoryProductById({
      id: eventData.new.inventory_product_id,
    })
    .catch((error) => {
      console.error(
        "🚀 ~ file: event_updateAvailableQtyOnInsertTransactionItem.ts ~ line 15 ~ handler ~ error",
        error
      );
      resTemplates.INTERNAL_SERVER_ERROR(res);
      return;
    });

  if (
    inventory_produk &&
    inventory_produk.data?.rocketjaket_inventory_product_by_pk
  ) {
    const qtyBefore =
      inventory_produk.data?.rocketjaket_inventory_product_by_pk?.available_qty;
    const newAvailableQty =
      qtyBefore &&
      eventData.old.transaction_status ===
        Rocketjaket_Transaction_Status_Enum_Enum.Success &&
      eventData.new.transaction_status ===
        Rocketjaket_Transaction_Status_Enum_Enum.Refund
        ? qtyBefore + eventData.new.purchase_qty
        : qtyBefore;
    const response = await sdk.Inventory_UpdateAvailableQtyByInventoryProductId(
      {
        id: eventData.new.inventory_product_id,
        available_qty: newAvailableQty,
      }
    );

    if (
      inventory_produk.data.rocketjaket_inventory_product_by_pk
        ?.min_available_qty &&
      newAvailableQty <=
        inventory_produk.data.rocketjaket_inventory_product_by_pk
          ?.min_available_qty
    ) {
      const res = await sdk.User_GetAllFcmTokens();
      const tokens =
        res.data?.users_fcm_token.map((fcm) => fcm.fcm_token) || [];
      console.log(
        "🚀 ~ file: event_updateAvailableQtyOnInsertTransactionItem.ts ~ line 56 ~ handler ~ tokens",
        tokens
      );
      const tes = await getMessaging(myFirebaseAdminApp).sendMulticast({
        tokens,
        data: {
          notifee: JSON.stringify({
            title: "Stok Produk Menipis",
            body: `Produk ${eventData.new.product_name} varian ${eventData.new.variant} hanya tersisa ${newAvailableQty}!`,
            data: {
              link: "myapp://inventory",
            },
            android: {
              channelId: "default",
              pressAction: {
                id: "default",
              },
              actions: [
                {
                  title: "Mark as Read",
                  pressAction: {
                    id: "mark-as-read",
                  },
                },
              ],
            },
          }),
        },
      });
      console.log(
        "🚀 ~ file: event_updateAvailableQtyOnInsertTransactionItem.ts ~ line 77 ~ tes ~ tes",
        tes
      );
    }
    console.log(
      "🚀 ~ file: event_updateAvailableQtyOnInsertTransactionItem.ts ~ line 39 ~ handler ~ response",
      response
    );

    resTemplates.OK(res);
  } else {
    console.log("error inventory_produk not found");
    resTemplates.INTERNAL_SERVER_ERROR(res);
  }
};

module.exports = handler;
