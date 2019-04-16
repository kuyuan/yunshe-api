import { Channel, Community, User, UserCommunity } from "@prisma/index";
import { generateUniqUsername } from "@support/test/helpers";
import prisma from "@utils/prisma";
import { schema } from "@utils/server";
import { graphql } from "graphql";

const rootValue = {};
let context;
let community: Community;
let publicChannel: Channel;
let privateChannel: Channel;
let currentUser: User;

beforeAll(async () => {
  community = await prisma.createCommunity({
    name: "测试社区",
    description: "这是一个测试社区",
    coverPhoto: "https://yunshe-sample-1256437689.cos.ap-shanghai.myqcloud.com/cover/cover1.jpg",
    profilePhoto: "https://yunshe-sample-1256437689.cos.ap-shanghai.myqcloud.com/community/comm1.png",
    isPrivate: false,
  });
  currentUser = await prisma.createUser({
    username: generateUniqUsername(),
    name: "测试人员",
    description: "what happened",
    coverPhoto: "	https://yunshe-sample-1256437689.cos.ap-shanghai.myqcloud.com/cover/cover12.jpg",
    profilePhoto: "https://yunshe-sample-1256437689.cos.ap-shanghai.myqcloud.com/avatar/avatar1.jpg",
  });
  publicChannel = await prisma.createChannel({
    communityId: community.id,
    name: "默认频道",
    description: "社区创建时默认创建的我频道",
    isPrivate: false,
    isDefault: true,
  });
  privateChannel = await prisma.createChannel({
    communityId: community.id,
    name: "私人频道",
    description: "私人频道",
    isPrivate: true,
    isDefault: false,
  });
  context = { prisma, currentUser };
});

afterAll(async () => {
  await prisma.deleteManyCommunities({ id: community.id });
  await prisma.deleteManyUsers({ id: currentUser.id });
  await prisma.deleteManyChannels({ id_in: [publicChannel.id, privateChannel.id] });
});

describe("Query community", () => {
  test("get community info", async () => {
    const userChannel = await prisma.createUserChannel({
      userId: currentUser.id,
      channelId: privateChannel.id,
      communityId: privateChannel.communityId,
      role: "MEMBER",
      status: "ACTIVE",
    });
    const query = `
      query {
        community(id: "${community.id}") {
          id
          name
          channels {
            id
            name
          }
        }
      }
    `;
    const { data } = await graphql(schema, query, rootValue, context);
    expect(data).toEqual({
      community: {
        id: community.id,
        name: "测试社区",
        channels: [
          {
            id: privateChannel.id,
            name: privateChannel.name,
          }, {
            id: publicChannel.id,
            name: publicChannel.name,
          },
        ],
      },
    });
    await prisma.deleteManyUserChannels({ id: userChannel.id });
  });
});

describe("Mutation updateCommunity", () => {
  let targetCommunity: Community;
  let userCommunity: UserCommunity;
  beforeEach(async () => {
    targetCommunity = await prisma.createCommunity({
      name: "需要修改的社区",
      description: "这是一个需要修改的社区",
      coverPhoto: "https://yunshe-sample-1256437689.cos.ap-shanghai.myqcloud.com/cover/cover1.jpg",
      profilePhoto: "https://yunshe-sample-1256437689.cos.ap-shanghai.myqcloud.com/community/comm1.png",
      isPrivate: false,
    });
    userCommunity = await prisma.createUserCommunity({
      userId: currentUser.id,
      communityId: targetCommunity.id,
      role: "OWNER",
      status: "ACTIVE",
    });
  });

  afterEach(async () => {
    await prisma.deleteManyCommunities({ id: targetCommunity.id });
    await prisma.deleteManyUserCommunities({ id: userCommunity.id });
  });

  describe("when input is ok", () => {
    test("it update community info", async () => {
      const query = `
        mutation UpdateCommunity($input: UpdateCommunityInput!) {
          updateCommunity(input: $input) {
            id
            description
          }
        }
      `;
      const variables = {
        input: {
          communityId: targetCommunity.id,
          description: "Updated description",
        },
      };
      const { data } = await graphql(schema, query, rootValue, context, variables);
      expect(data).toEqual({
        updateCommunity: {
          id: targetCommunity.id,
          description: "Updated description",
        },
      });
    });
  });
});
