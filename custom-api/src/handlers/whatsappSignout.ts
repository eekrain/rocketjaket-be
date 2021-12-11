import { Request, Response } from "express";
import { resTemplates } from "../utils";
import axios from "axios";

// Request Handler

interface MyWASignoutResponse {
  is_success: boolean;
}

const handler = async (req: Request, res: Response) => {
  const responseSignout = await axios
    .get<MyWASignoutResponse>(
      `${process.env.WHATSAPP_API_BACKEND}/auth/signout`
    )
    .catch((error) => {
      console.log(
        "🚀 ~ file: getWhatsappAuthStatus.ts ~ line 20 ~ handler ~ error",
        error
      );
      resTemplates.INTERNAL_SERVER_ERROR(res);
    });

  if (responseSignout) {
    const output: whatsappSignoutOutput = {
      is_success: responseSignout.data.is_success,
    };
    res.send(output);
  } else {
    resTemplates.INTERNAL_SERVER_ERROR(res);
  }
};

module.exports = handler;
