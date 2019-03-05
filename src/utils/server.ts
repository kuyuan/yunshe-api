import { makeExecutableSchema } from "graphql-tools";
import { GraphQLServer } from "graphql-yoga";
import { MongoClient } from "mongodb";
import resolvers from "../resolvers";
import typeDefs from "../typeDefs";

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export const createServer = async (client: MongoClient) => {
  await client.connect();
  const db = client.db();

  const server = new GraphQLServer({
    context: () => ({ db }),
    schema,
  });

  return server;
};
