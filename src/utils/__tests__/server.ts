import { createClient } from "@utils/mongo";
import { createServer } from "@utils/server";
import getPort from "get-port";
import got from "got";
import { Db, MongoClient } from "mongodb";

let db: Db;
let client: MongoClient;
let activeServer;
let port: number;

beforeAll(async () => {
  client = await createClient();
  db = client.db();
  const server = createServer({ db });
  port = await getPort();
  activeServer = await server.start({
    port,
    endpoint: "/graphql",
  });
});

afterAll(async () => {
  await activeServer.close();
  await client.close();
});

describe("basic", () => {
  const query = `
    query {
      dummy
    }
  `;
  test("dummy", async () => {
    const api = got.extend({
      baseUrl: `http://localhost:${port}`,
      responseType: "json",
      headers: {
        "Content-Type": "application/graphql",
      },
    });
    const response = await api.post("graphql", { body: query });
    expect(JSON.parse(response.body)).toEqual({
      data: {
        dummy: "hello world",
      },
    });
  });
});
