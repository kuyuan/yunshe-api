import { getCommunityById, getCommunitiesByIds } from "@models/community";
import { YUNSHE_COMMUNITY_ID, DELETED_COMMUNITY_ID, PRIVATE_COMMUNITY_ID } from "@support/seed/constants";
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

describe("getCommunitiesByIds", () => {
  test("return sorted communities", async () => {
    const communities = await getCommunitiesByIds([
      DELETED_COMMUNITY_ID,
      YUNSHE_COMMUNITY_ID,
      PRIVATE_COMMUNITY_ID
    ], db)
    expect(communities.length).toBe(3);
    expect(communities[0].name).toBe("已删除社区");
    expect(communities[1].name).toBe("云社官方社区");
    expect(communities[2].name).toBe("私人社区");
  })
})
