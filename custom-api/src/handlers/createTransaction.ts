import { Request, Response } from "express";
import { getUserSdk } from "../utils";
import dayjs from "dayjs";
import { getRandomAlphabet, resTemplates } from "../utils";
import {
  Rocketjaket_Transaction_Payment_Type_Enum_Enum,
  Rocketjaket_Transaction_Status_Enum_Enum,
} from "../graphql/gql-generated";

const handler = async (req: Request, res: Response) => {
  const params: createTransactionArgs = req.body.input;

  if (params.cash_in_amount < params.total_transaction) {
    console.log(
      "🚀 ~ file: createTransaction.ts ~ line 10 ~ handler ~ params.cash_in_amount < params.total_transaction",
      params.cash_in_amount < params.total_transaction
    );
    resTemplates.BAD_REQUEST(res);
    return;
  }

  const sdk = getUserSdk(req);

  const updatedAt = await sdk
    .Inventory_GetInventoryProductUpdatedAtByIds({
      _in: params.transaction_items.map((item) => item.product_inventory_id),
    })
    .catch((error) => {
      console.error(
        "🚀 ~ file: createTransaction.ts ~ line 17 ~ handler ~ error",
        error
      );
      resTemplates.INTERNAL_SERVER_ERROR(res);
      return;
    });
  const updatedAtData = updatedAt
    ? updatedAt.data?.rocketjaket_inventory_product || []
    : [];

  let isOutOfSync = false;

  params.transaction_items.forEach((item) => {
    const found_inv_pdk = updatedAtData.find(
      (inv_pdk) => inv_pdk.id === item.product_inventory_id
    );

    if (
      item.inventory_product_updated_at !== found_inv_pdk?.updated_at ||
      item.product_updated_at !== found_inv_pdk?.product.updated_at
    ) {
      isOutOfSync = true;
    }
  });

  if (isOutOfSync) {
    const output: createTransactionOutput = {
      cash_in_amount: params.cash_in_amount,
      payment_type: params.payment_type,
      total_transaction: params.total_transaction,
      isOutOfSync,
      store_id: params.store_id,
      transaction_status: TransactionStatusEnum.failed,
    };
    res.send(output);
    return;
  }
  const created_at_gte = dayjs().startOf("day").toISOString();

  const getLastInvoiceNumber = await sdk
    .Transaction_GetLastTransactionNumber({
      created_at_gte: created_at_gte,
    })
    .catch((error) => {
      console.error(
        "🚀 ~ file: createTransaction.ts ~ line 54 ~ handler ~ error",
        error
      );
      resTemplates.INTERNAL_SERVER_ERROR(res);
      return;
    });

  const lastInvoiceNumber = getLastInvoiceNumber
    ? getLastInvoiceNumber.data?.rocketjaket_transaction?.[0]?.invoice_number.split(
        "/"
      )
    : undefined;

  const newInvoiceNumber = lastInvoiceNumber
    ? `${lastInvoiceNumber?.[0]}/${lastInvoiceNumber?.[1]}/${getRandomAlphabet(
        3
      )}/${parseInt(lastInvoiceNumber?.[3], 10) + 1}`
    : `INV/${dayjs().format("YYYYMMDD")}/${getRandomAlphabet(3)}/1`;

  const response = await sdk
    .Transaction_CreateOneTransaction({
      object: {
        invoice_number: newInvoiceNumber,
        total_transaction: params.total_transaction,
        cash_in_amount: params.cash_in_amount,
        cash_change: params.cash_in_amount - params.total_transaction,
        payment_type:
          params.payment_type as unknown as Rocketjaket_Transaction_Payment_Type_Enum_Enum,
        user_id: params.user_id,
        transaction_items: {
          data: params.transaction_items.map((item) => {
            const subtotal =
              item?.selling_price * item.purchace_qty -
              (item.selling_price * item.purchace_qty * item.discount) / 100;
            const profit = subtotal - item.capital_price * item.purchace_qty;

            return {
              product_name: item.product_name,
              variant: item.variant,
              capital_price: item.capital_price,
              selling_price: item.selling_price,
              discount: item.discount,
              purchase_qty: item.purchace_qty,
              subtotal,
              profit,
              inventory_product_id: item.product_inventory_id,
              transaction_status:
                Rocketjaket_Transaction_Status_Enum_Enum.Success,
            };
          }),
        },
        transaction_status: Rocketjaket_Transaction_Status_Enum_Enum.Success,
        store_id: params.store_id,
      },
    })
    .catch((error) => {
      console.error(
        "🚀 ~ file: createTransaction.ts ~ line 107 ~ handler ~ error",
        error
      );
      resTemplates.INTERNAL_SERVER_ERROR(res);
      return;
    });

  if (response) {
    const output: createTransactionOutput = {
      invoice_number:
        response.data?.insert_rocketjaket_transaction_one?.invoice_number,
      isOutOfSync,
      payment_type: params.payment_type,
      cash_change: params.cash_in_amount - params.total_transaction,
      total_transaction: params.total_transaction,
      cash_in_amount: params.cash_in_amount,
      store_id: params.store_id,
      transaction_status: TransactionStatusEnum.success,
    };
    console.log(
      "🚀 ~ file: createTransaction.ts ~ line 122 ~ handler ~ output",
      output
    );
    res.send(output);
  } else {
    resTemplates.INTERNAL_SERVER_ERROR(res);
    return;
  }
};

module.exports = handler;
