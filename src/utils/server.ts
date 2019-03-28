import prisma from "@utils/prisma";
import { formatError } from "apollo-errors";
import { makeExecutableSchema } from "graphql-tools";
import { GraphQLServer, Options } from "graphql-yoga";
import { ObjectID } from "mongodb";
import passport from "passport";
import resolvers from "../resolvers";
import typeDefs from "../typeDefs";
import {
  authHeaderMiddleware,
  sessionMiddleware,
} from "./expressMiddlewares";
import initPassport from "./passport";
import permissions from "./permissions";

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export const createServer = ({ db }) => {
  const server = new GraphQLServer({
    context: ({ request }) => {
      return {
        req: request,
        db,
        prisma,
        currentUser: request.user || null,
      };
    },
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

export const serverOptions: Options = {
  port: 4000,
  endpoint: "/graphql",
  playground: "/playground",
  subscriptions: "/websocket",
  formatError,
};
