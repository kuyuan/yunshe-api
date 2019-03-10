import { getCommunitiesByIds, getCommunityById } from "@models/community";
import { DELETED_COMMUNITY_ID, PRIVATE_COMMUNITY_ID, YUNSHE_COMMUNITY_ID } from "@support/seed/constants";
import { createClient } from "@utils/mongo";
import { Db, MongoClient } from "mongodb";

let db: Db;
let client: MongoClient;

beforeAll(async () => {
  client = await createClient();
  db = client.db();
});

afterAll(() => {
  client.close();
});

describe("getCommunityById", () => {
  test("basic", async () => {
    const community = await getCommunityById(YUNSHE_COMMUNITY_ID, db);
    expect(community.name).toBe("云社官方社区");
  });
});

describe("getCommunitiesByIds", () => {
  test("return sorted communities", async () => {
    const communities = await getCommunitiesByIds([
      DELETED_COMMUNITY_ID,
      YUNSHE_COMMUNITY_ID,
      PRIVATE_COMMUNITY_ID,
    ], db);
    expect(communities.length).toBe(3);
    expect(communities[0]).toBe(null);
    expect(communities[1].name).toBe("云社官方社区");
    expect(communities[2].name).toBe("私人社区");
  });
});
