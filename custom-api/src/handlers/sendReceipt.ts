import { Request, Response } from "express";
import { getAdminSdk, myNumberFormat, resTemplates } from "../utils";
import axios from "axios";
import {
  InputMaybe,
  Rocketjaket_Customer_Bool_Exp,
} from "src/graphql/gql-generated";

// Request Handler

interface MyWASendMessageResponse {
  status: "success" | "error";
  message: string;
}

const handler = async (req: Request, res: Response) => {
  const params: sendReceiptArgs = req.body.input;
  const customerSearch:
    | InputMaybe<
        Rocketjaket_Customer_Bool_Exp | Rocketjaket_Customer_Bool_Exp[]
      >
    | undefined = [];
  if (params.customer?.email) {
    customerSearch.push({
      email: {
        _eq: params.customer.email,
      },
    });
  }
  if (params.customer?.phone_number) {
    params.customer.phone_number =
      params.customer.phone_number.charAt(0) === "0"
        ? `62${params.customer.phone_number.slice(1)}`
        : `62${params.customer.phone_number}`;
    customerSearch.push({
      phone_number: { _eq: params.customer.phone_number },
    });
  }
  const sdk = getAdminSdk();

  const foundInvoice = await sdk
    .Transaction_GetTransactionByPK({
      invoice_number: params.invoice_number,
    })
    .catch((error) => {
      console.log(
        "🚀 ~ file: sendReceipt.ts ~ line 44 ~ handler ~ error",
        error
      );
      resTemplates.INTERNAL_SERVER_ERROR(res);
    });

  if (!foundInvoice || (foundInvoice && foundInvoice.errors)) {
    resTemplates.BAD_REQUEST(res);
    return;
  }

  const foundCustomer = await sdk
    .Transaction_GetCustomerByEmailOrPhone({
      _or: customerSearch,
    })
    .catch((error) => {
      console.log(
        "🚀 ~ file: sendReceipt.ts ~ line 16 ~ handler ~ error",
        error
      );
      resTemplates.INTERNAL_SERVER_ERROR(res);
      return;
    });
  if (foundCustomer) {
    console.log(
      "🚀 ~ file: sendReceipt.ts ~ line 29 ~ handler ~ foundCustomer",
      foundCustomer?.data
    );
  }

  let is_sent = false;
  if (params.customer?.phone_number) {
    // const tes
    const resWA = await axios
      .post<MyWASendMessageResponse>(
        `${process.env.WHATSAPP_API_BACKEND}/chat/sendmessage/${params.customer?.phone_number}`,
        {
          message: `Terimakasih ${
            params.customer.name
          } telah berbelanja di Rocketjaket!\nInvoice: ${
            params.invoice_number
          }\nItem dibeli:\n${foundInvoice.data?.rocketjaket_transaction_by_pk?.transaction_items
            .map((item) => {
              return `${item.product_name}(x${
                item.purchase_qty
              }): ${myNumberFormat.rp(item.subtotal)}`;
            })
            .join("\n")}\nTotal: ${myNumberFormat.rp(
            foundInvoice.data?.rocketjaket_transaction_by_pk?.total_transaction
          )}`,
        }
      )
      .catch((error) => {
        console.log(
          "🚀 ~ file: sendReceipt.ts ~ line 26 ~ handler ~ error",
          error
        );
      });
    if (resWA && resWA.data.status === "success") {
      is_sent = true;
    }
  }

  if (
    foundCustomer &&
    foundCustomer.data?.rocketjaket_customer &&
    foundCustomer.data?.rocketjaket_customer.length > 0
  ) {
    console.log(
      "🚀 ~ file: sendReceipt.ts ~ line 85 ~ handler ~ run on found customer"
    );
    const resReceipt = await sdk
      .Transaction_CreateTransactionReceiptWithUpdateCustomer({
        receipt_data: {
          is_sent,
          receipt_type: params.receipt_type,
          transaction_invoice_number: params.invoice_number,
          customer_id: foundCustomer.data?.rocketjaket_customer?.[0].id,
        },
        customer_id: foundCustomer.data?.rocketjaket_customer?.[0].id,
        customer_data: {
          name: params.customer?.name,
          email: params.customer?.email,
          phone_number: params.customer?.phone_number,
        },
      })
      .catch((error) => {
        console.log(
          "🚀 ~ file: sendReceipt.ts ~ line 57 ~ handler ~ error",
          error
        );
        resTemplates.INTERNAL_SERVER_ERROR(res);
      });

    if (
      resReceipt &&
      resReceipt.data?.insert_rocketjaket_transaction_receipt_one
    ) {
      const receipt =
        resReceipt.data?.insert_rocketjaket_transaction_receipt_one;
      const output: sendReceiptOutput = {
        created_at: receipt.created_at,
        id: receipt.id,
        is_sent: receipt.is_sent,
        email: receipt.customer.email,
        name: receipt.customer.name,
        phone_number: receipt.customer.phone_number,
      };
      console.log(
        "🚀 ~ file: sendReceipt.ts ~ line 124 ~ handler ~ output",
        output
      );
      res.send(output);
    } else {
      resTemplates.INTERNAL_SERVER_ERROR(res);
    }
  } else {
    console.log(
      "🚀 ~ file: sendReceipt.ts ~ line 130 ~ handler ~ run on not found customer"
    );

    const resReceipt = await sdk
      .Transaction_CreateTransactionReceipt({
        object: {
          is_sent,
          receipt_type: params.receipt_type,
          transaction_invoice_number: params.invoice_number,
          customer: {
            data: {
              name: params.customer?.name,
              email: params.customer?.email,
              phone_number: params.customer?.phone_number,
            },
          },
        },
      })
      .catch((error) => {
        console.error(
          "🚀 ~ file: sendReceipt.ts ~ line 33 ~ handler ~ error",
          error
        );
        resTemplates.INTERNAL_SERVER_ERROR(res);
      });
    if (
      resReceipt &&
      resReceipt.data?.insert_rocketjaket_transaction_receipt_one
    ) {
      const receipt =
        resReceipt.data?.insert_rocketjaket_transaction_receipt_one;
      const output: sendReceiptOutput = {
        created_at: receipt.created_at,
        id: receipt.id,
        is_sent: receipt.is_sent,
        email: receipt.customer.email,
        name: receipt.customer.name,
        phone_number: receipt.customer.phone_number,
      };
      console.log(
        "🚀 ~ file: sendReceipt.ts ~ line 169 ~ handler ~ output",
        output
      );
      res.send(output);
    } else {
      resTemplates.INTERNAL_SERVER_ERROR(res);
    }
  }
};

module.exports = handler;
