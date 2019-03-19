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
    currentUser {
      _id
      name
    }
  }
`;

beforeAll(async () => {
  client = await createClient();
  db = client.db();
  const server = createServer({ db });
  server.express.use((req, res, next) => {
    // @ts-ignore
    req.session.user = {
      _id: "5c8fb05679cc01608b04003d",
      name: "I AM ROBOT",
    };
    next();
  });
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
    console.log(process.env.SESSION_COOKIE_SECRET);
    const response = await api.post("graphql", { body: query });
    console.log(response.headers);
    expect(JSON.parse(response.body)).toEqual({
      data: {
        currentUser: null,
      },
    });
  });
});
