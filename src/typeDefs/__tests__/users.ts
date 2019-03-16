import { BRAN_ID, WUQIAN_ID } from "@support/seed/constants";
import createLoader from "@utils/loader";
import { createClient } from "@utils/mongo";
import { schema } from "@utils/server";
import { graphql } from "graphql";
import { Db, MongoClient, ObjectID } from "mongodb";

let db: Db;
let context;
let client: MongoClient;
const rootValue = {};
const currentUser = {
  _id: BRAN_ID,
  name: "酷猿创始人",
};

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
    expect(data).toEqual({
      user: {
        _id: WUQIAN_ID.toString(),
        name: "吴倩",
      },
    });
  });

  test("query currentUser", async () => {
    const query = `
      query {
        currentUser {
          _id
          name
        }
      }
    `;
    const { data } = await graphql(schema, query, rootValue, context);
    expect(data).toEqual({
      currentUser: {
        _id: BRAN_ID.toString(),
        name: "酷猿创始人",
      },
    });
  });
});

describe("Mutation User", () => {
  const testUserId = new ObjectID("5c8ca1074cca2a3a5570c704");

  beforeEach(async () => {
    await db.collection("users").insertOne({
      _id: testUserId,
      name: "TEST USER",
      description: "Who am I?",
      profilePhoto: "http://corran.cn/profile-1.jpg",
      coverPhoto: "http://corran.cn/cover-1.jpg",
    });
  });

  afterEach(async () => {
    await db.collection("users").deleteOne({
      _id: testUserId,
    });
  });

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
    const params = {
      input: {
        name: "TEST USER - updated",
        description: "Who am I? - updated"
      }
    }
    context.currentUser = {
      _id: testUserId,
      name: "TEST USER",
    }
    const { data } = await graphql(schema, query, rootValue, context, params);
    expect(data).toEqual({
      editUser: {
        _id: testUserId.toString(),
        name: "TEST USER - updated",
        description: "Who am I? - updated"
      },
    });
  })
})
