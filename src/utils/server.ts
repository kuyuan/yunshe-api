import { makeExecutableSchema } from "graphql-tools";
import { GraphQLServer } from "graphql-yoga";
import passport from "passport";
import resolvers from "../resolvers";
import typeDefs from "../typeDefs";
import createLoader from "./loader";
import session from "./session";

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

  server.express.use(session);
  server.express.use(passport.initialize());
  server.express.use(passport.session());

  return server;
};
