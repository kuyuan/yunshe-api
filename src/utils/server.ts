import { makeExecutableSchema } from "graphql-tools";
import { GraphQLServer } from "graphql-yoga";
import resolvers from "../resolvers";
import typeDefs from "../typeDefs";

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export const createServer = ({ db }) => {
  const server = new GraphQLServer({
    context: { db },
    schema,
  });

  return server;
};
