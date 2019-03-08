import { makeExecutableSchema } from "graphql-tools";
import { GraphQLServer } from "graphql-yoga";
import { MongoClient } from "mongodb";
import resolvers from "../resolvers";
import typeDefs from "../typeDefs";

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export const createServer = (client: MongoClient) => {
  const server = new GraphQLServer({
    context: async () => {
      await client.connect();
      const db = client.db();
      return {
        db,
      };
    },
    schema,
  });

  return server;
};
