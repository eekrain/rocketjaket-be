export const getHasuraEndpoint = () => {
  return process.env.HASURA_ENDPOINT || "http://172.17.0.1:8080/v1/graphql";
};
