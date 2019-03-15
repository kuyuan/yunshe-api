import { WUQIAN_ID } from "@support/seed/constants";
import createLoader from "@utils/loader";
import { createClient } from "@utils/mongo";
import { schema } from "@utils/server";
import { graphql } from "graphql";
import { Db, MongoClient } from "mongodb";

let db: Db;
let context;
let client: MongoClient;
const rootValue = {};
const currentUser = {
  _id: "5c7aa60cb372d6355eeedae2", // Bran
  name: '酷猿创始人',
}

beforeAll(async () => {
  client = await createClient();
  db = client.db();
  context = { db, loader: createLoader(db), currentUser };
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

  test("query currentUser", async () => {
    const query = `
      query {
        currentUser {
          _id
          name
        }
      }
    `
    const { data } = await graphql(schema, query, rootValue, context);
    expect(data.currentUser.name).toBe("酷猿创始人");
  })
});
