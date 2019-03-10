import { WUQIAN_ID } from "@support/seed/constants";
import createLoader from "@utils/loader";
import { createClient } from "@utils/mongo";
import { schema } from "@utils/server";
import { graphql } from "graphql";
import { Db, MongoClient } from "mongodb";

let db: Db;
const rootValue = {};
let context;
let client: MongoClient;

beforeAll(async () => {
  client = await createClient();
  db = client.db();
  context = { db, loader: createLoader(db) };
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
