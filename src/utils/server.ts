import { makeExecutableSchema } from "graphql-tools";
import { GraphQLServer } from "graphql-yoga";
import resolvers from "../resolvers";
import typeDefs from "../typeDefs";
import { createClient } from "./mongo";

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export const createServer = () => {
  const server = new GraphQLServer({
    context: async () => {
      const client = await createClient();
      const db = client.db();
      return {
        db,
      };
    },
    schema,
  });

  return server;
};
