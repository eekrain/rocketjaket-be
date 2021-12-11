export const getEnvVar = {
  PORT: process.env.PORT || 3000,
  HASURA_ENDPOINT:
    process.env.HASURA_ENDPOINT || "http://172.17.0.1:8080/v1/graphql",
  HASURA_GRAPHQL_ADMIN_SECRET:
    process.env.HASURA_GRAPHQL_ADMIN_SECRET || "123456",
};
