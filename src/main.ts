import { GraphQLServer } from "graphql-yoga";
import { createClient } from "utils/mongo";
import resolvers from "./resolvers";
import typeDefs from "./types";

(async () => {
  const client = createClient();
  await client.connect();
  const db = client.db();

  const server = new GraphQLServer({
    context: () => ({ db }),
    resolvers,
    typeDefs,
  });

  server.start();
})();
