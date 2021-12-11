import { Request, Response } from "express";
import { getAdminSdk, myNumberFormat, resTemplates } from "../utils";
import axios from "axios";
import {
  InputMaybe,
  Rocketjaket_Customer_Bool_Exp,
} from "src/graphql/gql-generated";

// Request Handler

interface MyWASendMessageResponse {
  status: "AUTHENTICATED" | "NOT_AUTHENTICATED";
  qrcode: string;
  state:
    | "CONFLICT"
    | "CONNECTED"
    | "DEPRECATED_VERSION"
    | "OPENING"
    | "PAIRING"
    | "PROXYBLOCK"
    | "SMB_TOS_BLOCK"
    | "TIMEOUT"
    | "TOS_BLOCK"
    | "UNLAUNCHED"
    | "UNPAIRED"
    | "UNPAIRED_IDLE";
  info?: {
    pushname: string;
    platform: string;
    me: {
      server: string;
      user: string;
      _serialized: string;
    };
    wid: {
      server: string;
      user: string;
      _serialized: string;
    };
    phone: {
      wa_version: string;
      mcc: string;
      mnc: string;
      os_version: string;
      device_manufacturer: string;
      device_model: string;
      os_build_number: string;
    };
  };
}

const handler = async (req: Request, res: Response) => {
  const responseAuth = await axios
    .get<MyWASendMessageResponse>(
      `${process.env.WHATSAPP_API_BACKEND}/auth/getqr`
    )
    .catch((error) => {
      console.log(
        "🚀 ~ file: getWhatsappAuthStatus.ts ~ line 20 ~ handler ~ error",
        error
      );
      resTemplates.INTERNAL_SERVER_ERROR(res);
    });

  if (responseAuth) {
    const client = responseAuth.data.info;
    const output: getWhatsappAuthStatusOutput = {
      is_authenticated:
        responseAuth.data.status === "AUTHENTICATED" ? true : false,
      qr_code: responseAuth.data.qrcode || null,
      client_device_manufacturer: client?.phone.device_manufacturer || null,
      client_device_model: client?.phone.device_model || null,
      client_name: client?.pushname || null,
      client_phone_number: client?.me.user || null,
      client_platform: client?.platform || null,
      client_state: responseAuth.data.state || null,
    };
    res.send(output);
  } else {
    resTemplates.INTERNAL_SERVER_ERROR(res);
  }
};

module.exports = handler;
