import { BRAN_ID } from "@support/seed/constants";
import { createClient } from "@utils/mongo";
import { createServer } from "@utils/server";
import got from "got";
import { Db, MongoClient } from "mongodb";

let db: Db;
let client: MongoClient;
let activeServer;
const api = got.extend({
  baseUrl: "http://localhost:7878",
  responseType: "json",
  headers: {
    "Content-Type": "application/graphql",
    "Cookie": `session=eyJwYXNzcG9ydCI6eyJ1c2VyIjoie1w\
iX2lkXCI6XCI1YzdhYTYwY2IzNzJkNjM1NWVlZWRhZTJcIixcIm5hb\
WVcIjpcIumFt+eMv+WIm+Wni+S6ulwifSJ9fQ==; \
session.sig=EBd4B_3uPCUKomg6NLnWg1Qwk18`,
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
        currentUser: {
          _id: BRAN_ID.toString(),
          name: "酷猿创始人",
        },
      },
    });
  });
});
