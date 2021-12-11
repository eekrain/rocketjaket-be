import { GraphQLClient } from "graphql-request";
import { getSdk } from "../graphql/gql-generated";
import { getEnvVar } from "./getEnvVar";
import { Request } from "express";

interface Headers {
  "x-hasura-role": string;
  "x-hasura-user-id": string;
}

export const getUserSdk = (req: Request) => {
  const session_variables: Headers = req.body.session_variables;
  const client = new GraphQLClient(getEnvVar.HASURA_ENDPOINT, {
    headers: {
      "x-hasura-role": session_variables["x-hasura-role"],
      "x-hasura-user-id": session_variables["x-hasura-user-id"],
      authorization: req.headers?.authorization || "",
    },
  });
  return getSdk(client);
};

export const getAdminSdk = () => {
  const client = new GraphQLClient(getEnvVar.HASURA_ENDPOINT, {
    headers: {
      "x-hasura-admin-secret": getEnvVar.HASURA_GRAPHQL_ADMIN_SECRET,
    },
  });
  return getSdk(client);
};
