import { getUserById, getUsersByIds } from "@models/user";
import { BRAN_ID, CAOYAN_ID, WUQIAN_ID } from "@support/seed/constants";
import { createClient } from "@utils/mongo";
import { Db } from "mongodb";

let db: Db;
const client = createClient();

beforeAll(async () => {
  await client.connect();
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
  test("the order is maintained", async () => {
    const users = await getUsersByIds([BRAN_ID, WUQIAN_ID, CAOYAN_ID], db);
    expect(users.length).toBe(3);
    expect(users[0].name).toBe("酷猿创始人");
    expect(users[1].name).toBe("吴倩");
    expect(users[2].name).toBe("曹言");
  });
});
