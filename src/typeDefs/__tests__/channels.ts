import { Channel } from "@prisma/index";
import prisma from "@utils/prisma";
import { schema } from "@utils/server";
import { graphql } from "graphql";

const rootValue = {};
let context;
let channel: Channel;

beforeAll(async () => {
  context = { prisma };
  channel = await prisma.createChannel({
    name: "默认频道",
    description: "社区创建时默认创建的我频道",
    isPrivate: false,
    isDefault: true,
    memberCount: 5,
  });
});

afterAll(async () => {
  await prisma.deleteManyChannels({ id: channel.id });
});

describe("Query channel", () => {
  test("get channel info", async () => {
    const query = `
      query {
        channel(id: "${channel.id}") {
          id
          name
        }
      }
    `;
    const { data } = await graphql(schema, query, rootValue, context);
    expect(data).toEqual({
      channel: {
        id: channel.id,
        name: "默认频道",
      },
    });
  });
});
