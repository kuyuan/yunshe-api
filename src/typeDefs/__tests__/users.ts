import { WUQIAN_ID } from "@support/seed/constants";
import { createClient } from "@utils/mongo";
import { schema } from "@utils/server";
import { graphql } from "graphql";
import { Db } from "mongodb";

let db: Db;
const rootValue = {};
let context;
const client = createClient();

beforeAll(async () => {
  await client.connect();
  db = client.db();
  context = { db };
});

afterAll(() => {
  client.close();
});

describe("Query user", () => {
  test("get user info", async () => {
    const query = `
      query {
        user(id: "${WUQIAN_ID}") {
          _id
          name
        }
      }
    `;
    const { data } = await graphql(schema, query, rootValue, context);
    expect(data.user.name).toBe("吴倩");
  });
});
