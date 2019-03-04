import { GraphQLServer } from "graphql-yoga";
import resolvers from "../resolvers";
import typeDefs from "../types";
import { createClient } from "./mongo";

export const createServer = async () => {
  const client = createClient();
  await client.connect();
  const db = client.db();

  const server = new GraphQLServer({
    context: () => ({ db }),
    resolvers,
    typeDefs,
  });

  return server;
};
