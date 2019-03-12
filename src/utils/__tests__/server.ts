import { createClient } from "@utils/mongo";
import { createServer } from "@utils/server";
import { Server } from "http";
import { Db, MongoClient } from "mongodb";

let db: Db;
let client: MongoClient;
let activeServer: Server;

beforeAll(async () => {
  client = await createClient();
  db = client.db();
  const server = createServer({ db });
  // @ts-ignore
  activeServer = await server.start({
    port: 7878,
    endpoint: "/graphql",
  });
});

afterAll(async () => {
  await activeServer.close();
  await client.close();
});

describe("Middlewares", () => {
  test("cookie", () => {
    expect(1 + 2).toBe(3);
  });
});
