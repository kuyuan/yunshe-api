import { getChannelById, getChannelsByIds } from "@models/channel";
import {
  YUNSHE_ARCHIVED_CHANNEL_ID,
  YUNSHE_DELETED_CHANNEL_ID,
  YUNSHE_GENERAL_CHANNEL_ID,
  YUNSHE_PRIVATE_CHANNEL_ID,
} from "@support/seed/constants";
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

describe("getChannelById", () => {
  test("basic", async () => {
    const channel = await getChannelById(YUNSHE_GENERAL_CHANNEL_ID, db);
    expect(channel.name).toBe("默认频道");
  });

  test("it return null for deleted channel", async () => {
    const channel = await getChannelById(YUNSHE_DELETED_CHANNEL_ID, db);
    expect(channel).toBe(null);
  });
});

describe("getChannelsByIds", () => {
  test("return sorted users", async () => {
    const channels = await getChannelsByIds([
      YUNSHE_GENERAL_CHANNEL_ID,
      YUNSHE_PRIVATE_CHANNEL_ID,
      YUNSHE_DELETED_CHANNEL_ID,
      YUNSHE_ARCHIVED_CHANNEL_ID,
    ], db);
    expect(channels.length).toBe(4);
    expect(channels[0].name).toBe("默认频道");
    expect(channels[1].name).toBe("私人频道");
    expect(channels[2]).toBe(null);
    expect(channels[3].name).toBe("归档频道");
  });
});
