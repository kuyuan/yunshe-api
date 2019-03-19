import { BRAN_ID } from "@support/seed/constants";
import { createClient } from "@utils/mongo";
import { createServer } from "@utils/server";
import getPort from "get-port";
import got from "got";
import jwt from "jsonwebtoken";
import { Db, MongoClient } from "mongodb";

let db: Db;
let client: MongoClient;
let activeServer;
let port: number;
const query = `
  query {
    currentUser {
      _id
      name
    }
  }
`;
const cookie = `session=eyJwYXNzcG9ydCI6eyJ1c2VyIjoie1w\
iX2lkXCI6XCI1YzdhYTYwY2IzNzJkNjM1NWVlZWRhZTJcIixcIm5hb\
WVcIjpcIumFt+eMv+WIm+Wni+S6ulwifSJ9fQ==; \
session.sig=EBd4B_3uPCUKomg6NLnWg1Qwk18`;

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

describe("Middleware", () => {
  test("cookie based session", async () => {
    const api = got.extend({
      baseUrl: `http://localhost:${port}`,
      responseType: "json",
      headers: {
        "Content-Type": "application/graphql",
        "Cookie": cookie,
      },
    });

    const response = await api.post("graphql", { body: query });
    expect(JSON.parse(response.body)).toEqual({
      data: {
        currentUser: {
          _id: BRAN_ID.toString(),
          name: "酷猿创始人",
        },
      },
    });
  });

  test("auth header based authentication", async () => {
    const token = `Bearer ${jwt.sign({ cookie }, process.env.API_TOKEN_SECRET)}`;
    const api = got.extend({
      baseUrl: `http://localhost:${port}`,
      responseType: "json",
      headers: {
        "Content-Type": "application/graphql",
        "Authorization": token,
      },
    });

    const response = await api.post("graphql", { body: query });
    expect(JSON.parse(response.body)).toEqual({
      data: {
        currentUser: {
          _id: BRAN_ID.toString(),
          name: "酷猿创始人",
        },
      },
    });
  });
});
