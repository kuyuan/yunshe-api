import { makeExecutableSchema } from "graphql-tools";
import { GraphQLServer } from "graphql-yoga";
import resolvers from "../resolvers";
import typeDefs from "../typeDefs";
import createLoader from "./loader";

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export const createServer = ({ db }) => {
  const server = new GraphQLServer({
    context: {
      db,
      loader: createLoader(db),
    },
    schema,
  });

  return server;
};
