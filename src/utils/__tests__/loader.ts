import {
  BRAN_ID,
  YUNSHE_COMMUNITY_ID,
} from "@support/seed/constants";
import createLoader from "@utils/loader";
import { createClient } from "@utils/mongo";
import { Db, MongoClient } from "mongodb";

let db: Db;
let loader = createLoader(db);
let client: MongoClient;

beforeAll(async () => {
  client = await createClient();
  db = client.db();
  loader = createLoader(db);
});

afterAll(() => {
  client.close();
});

test("user loader", async () => {
  const user = await loader.user.load(BRAN_ID);
  expect(user.name).toBe("酷猿创始人");
});

test("community loader", async () => {
  const community = await loader.community.load(YUNSHE_COMMUNITY_ID);
  expect(community.name).toBe("云社官方社区");
});
