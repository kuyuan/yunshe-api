import { getUserById } from "models/user";
import { Db } from "mongodb";
import { WUQIAN_ID } from "support/seed/constants";
import { createClient } from "utils/mongo";

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
