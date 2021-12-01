import { GraphQLClient } from "graphql-request";
import { getSdk } from "../graphql/gql-generated";
import { getHasuraEndpoint } from "./getHasuraEndpoint";
import { Request } from "express";

interface Headers {
  "x-hasura-role": string;
  "x-hasura-user-id": string;
}

export const getMySdk = (req: Request) => {
  const session_variables: Headers = req.body.session_variables;
  const client = new GraphQLClient(getHasuraEndpoint(), {
    headers: {
      "x-hasura-role": session_variables["x-hasura-role"],
      "x-hasura-user-id": session_variables["x-hasura-user-id"],
      authorization: req.headers?.authorization || "",
    },
  });
  return getSdk(client);
};
