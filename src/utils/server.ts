import { makeExecutableSchema } from "graphql-tools";
import { GraphQLServer } from "graphql-yoga";
import passport from "passport";
import resolvers from "../resolvers";
import typeDefs from "../typeDefs";
import {
  authHeaderMiddleware,
  sessionMiddleware,
} from "./expressMiddlewares";
import createLoader from "./loader";
import initPassport from "./passport";
import permissions from "./permissions";

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export const createServer = ({ db }) => {
  const server = new GraphQLServer({
    context: ({ request }) => ({
      req: request,
      db,
      loader: createLoader(db),
      currentUser: request.user || null,
    }),
    schema,
    middlewares: [permissions],
  });

  initPassport();

  server.express.use(authHeaderMiddleware);
  server.express.use(sessionMiddleware);
  server.express.use(passport.initialize());
  server.express.use(passport.session());

  return server;
};
