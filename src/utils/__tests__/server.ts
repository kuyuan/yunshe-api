import { createClient } from "@utils/mongo";
import { createServer } from "@utils/server";
import got from "got";
import { Server } from "http";
import { Db, MongoClient } from "mongodb";

let db: Db;
let client: MongoClient;
let activeServer: Server;
const api = got.extend({
  baseUrl: "http://localhost:7878",
  responseType: "json",
  headers: {
    "Content-Type": "application/graphql",
  },
});
const query = `
  query {
    dummy
  }
`;

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

describe("basic", () => {
  test("dummy", async () => {
    const response = await api.post("graphql", { body: query });
    expect(JSON.parse(response.body)).toEqual({
      data: {
        dummy: "hello world",
      },
    });
  });
});
