import { Request, Response } from "express";
import { Rocketjaket_Transaction_Status_Enum_Enum } from "../graphql/gql-generated";
import { getAdminSdk, resTemplates } from "../utils";

// Request Handler
const handler = async (req: Request, res: Response) => {
  const params: refundTransactionArgs = req.body.input;

  const sdk = getAdminSdk();

  const transaction = await sdk
    .Transaction_GetTransactionByPK({
      invoice_number: params.invoice_number,
    })
    .catch((error) => {
      console.log(
        "🚀 ~ file: refundTransaction.ts ~ line 13 ~ handler ~ error",
        error
      );
      resTemplates.BAD_REQUEST(res);
      return;
    });
  console.log(
    "🚀 ~ file: refundTransaction.ts ~ line 22 ~ handler ~ transaction",
    transaction
  );

  if (transaction) {
    if (params.isRefundAll) {
      const resRefund = await sdk
        .Transaction_UpdateTransactionForRefund({
          invoice_number: params.invoice_number,
          items_transaction_status:
            Rocketjaket_Transaction_Status_Enum_Enum.Refund,
          main_transaction_status:
            Rocketjaket_Transaction_Status_Enum_Enum.Refund,
          refund_reason: params.refund_reason,
        })
        .catch((error) => {
          console.log(
            "🚀 ~ file: refundTransaction.ts ~ line 38 ~ handler ~ error",
            error
          );
          resTemplates.INTERNAL_SERVER_ERROR(res);
        });

      if (resRefund && resRefund.data) {
        const output: refundTransactionOutput = {
          invoice_number: params.invoice_number,
          is_success: true,
        };
        res.send(output);
      } else {
        resTemplates.INTERNAL_SERVER_ERROR(res);
      }
    } else {
      resTemplates.INTERNAL_SERVER_ERROR(res);
    }
  } else {
    resTemplates.BAD_REQUEST(res);
    return;
  }
};

module.exports = handler;
