import { Channel, Community } from "@prisma/index";
import prisma from "@utils/prisma";
import { schema } from "@utils/server";
import { graphql } from "graphql";

const rootValue = {};
let context;
let channel: Channel;
let community: Community;

beforeAll(async () => {
  context = { prisma };
  community = await prisma.createCommunity({
    name: "测试社区",
    description: "这是一个测试社区",
    coverPhoto: "https://yunshe-sample-1256437689.cos.ap-shanghai.myqcloud.com/cover/cover1.jpg",
    profilePhoto: "https://yunshe-sample-1256437689.cos.ap-shanghai.myqcloud.com/community/comm1.png",
    isPrivate: false,
  });
  channel = await prisma.createChannel({
    communityId: community.id,
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
