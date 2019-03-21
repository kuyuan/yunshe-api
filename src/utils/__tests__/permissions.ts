import { createClient } from "@utils/mongo";
import { createServer, serverOptions } from "@utils/server";
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
    ...serverOptions,
    port,
  });
});

afterAll(async () => {
  await activeServer.close();
  await client.close();
});

describe("isValidUser", () => {
  test("editUser", async () => {
    const api = got.extend({
      baseUrl: `http://localhost:${port}`,
      responseType: "json",
      headers: {
        "Content-Type": "application/json",
      },
    });
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
    expect(body.errors[0].name).toBe("NotAuthorizedError");
  });
});
