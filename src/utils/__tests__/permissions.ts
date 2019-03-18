import { createClient } from "@utils/mongo";
import { createServer } from "@utils/server";
import got from "got";
import { Server } from "http";
import { Db, MongoClient } from "mongodb";

let db: Db;
let client: MongoClient;
let activeServer: Server;
const api = got.extend({
  baseUrl: "http://localhost:7879",
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
  },
});

beforeAll(async () => {
  client = await createClient();
  db = client.db();
  const server = createServer({ db });
  // @ts-ignore
  activeServer = await server.start({
    port: 7879,
    endpoint: "/graphql",
  });
});

afterAll(async () => {
  await activeServer.close();
  await client.close();
});

describe("isValidUser", () => {
  test("editUser", async () => {
    const query = `
      mutation($input: EditUserInput!) {
        editUser(input: $input) {
          _id
          name
          description
        }
      }
    `;
    const variables = {
      input: {
        name: "TEST USER - updated",
        description: "Sample description - updated",
      },
    };
    const response = await api.post("graphql", { body: JSON.stringify({ query, variables }) });
    const body = JSON.parse(response.body);
    expect(body.data).toEqual({
      editUser: null,
    });
    expect(body.errors[0].message).toBe("Not Authorised!");
  });
});
