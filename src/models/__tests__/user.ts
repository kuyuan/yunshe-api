import {
  getUserById,
  getUsersByIds,
  editUser
} from "@models/user";
import { BRAN_ID, CAOYAN_ID, WUQIAN_ID } from "@support/seed/constants";
import { createClient } from "@utils/mongo";
import { Db, MongoClient, ObjectID } from "mongodb";

let db: Db;
let client: MongoClient;

beforeAll(async () => {
  client = await createClient();
  db = client.db();
});

afterAll(() => {
  client.close();
});

describe("getUserById", () => {
  test("basic", async () => {
    const user = await getUserById(WUQIAN_ID, db);
    expect(user.name).toBe("吴倩");
  });
});

describe("getUsersByIds", () => {
  test("return sorted users", async () => {
    const users = await getUsersByIds([BRAN_ID, WUQIAN_ID, CAOYAN_ID], db);
    expect(users.length).toBe(3);
    expect(users[0].name).toBe("酷猿创始人");
    expect(users[1].name).toBe("吴倩");
    expect(users[2].name).toBe("曹言");
  });
});

describe("editUser", () => {
  const testUserId = new ObjectID("5c8c97e4faf5ef325c163d93")

  beforeEach(async () => {
    await db.collection("users").insertOne({
      _id: testUserId,
      name: "TEST USER",
      description: "Who am I?",
      profilePhoto: "http://corran.cn/profile-1.jpg",
      coverPhoto: "http://corran.cn/cover-1.jpg",
    })
  })

  afterEach(async () => {
    await db.collection("users").deleteOne({
      _id: testUserId
    })
  })
  test("field name and description", async () => {
    const input = {
      name: "TEST USER - update",
      description: "Who am I? - update"
    }
    const user = await editUser(testUserId, input, db);
    expect(user.name).toBe("TEST USER - update")
    expect(user.description).toBe("Who am I? - update")
  })
})
