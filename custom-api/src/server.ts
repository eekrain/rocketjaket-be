require("dotenv").config();
import app from "./app";
import { initializeApp, cert } from "firebase-admin/app";
import serviceAccount from "./rocketjaket-hasura-firebase-adminsdk-72pei-f0e05131f3.json";

export const myFirebaseAdminApp = initializeApp({
  credential: cert({
    projectId: serviceAccount.project_id,
    clientEmail: serviceAccount.client_email,
    privateKey: serviceAccount.private_key,
  }),
});

const server = app.listen(3000, () =>
  console.log("Starting ExpressJS server on Port 3000")
);

export default server;
