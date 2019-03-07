import { getCommunityById } from "@models/community";
import { YUNSHE_COMMUNITY_ID } from "@support/seed/constants";
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

describe("getCommunityById", () => {
  test("basic", async () => {
    const community = await getCommunityById(YUNSHE_COMMUNITY_ID, db)
    expect(community.name).toBe("云社官方社区")
  })
})
