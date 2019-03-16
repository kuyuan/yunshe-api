import { YUNSHE_GENERAL_CHANNEL_ID } from "@support/seed/constants";
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

describe("Query channel", () => {
  test("get channel info", async () => {
    const query = `
      query {
        channel(id: "${YUNSHE_GENERAL_CHANNEL_ID}") {
          _id
          name
        }
      }
    `;
    const { data } = await graphql(schema, query, rootValue, context);
    expect(data).toEqual({
      channel: {
        _id: YUNSHE_GENERAL_CHANNEL_ID.toString(),
        name: "默认频道",
      },
    });
  });
});
