import { Channel, Community, User } from "@prisma/index";
import { generateUniqUsername } from "@support/test/helpers";
import { generateSessionCookie } from "@utils/cookie";
import { createClient } from "@utils/mongo";
import prisma from "@utils/prisma";
import { schema } from "@utils/server";
import { createServer, serverOptions } from "@utils/server";
import getPort from "get-port";
import got from "got";
import { graphql } from "graphql";
import { Db, MongoClient } from "mongodb";

const rootValue = {};
let context;
let channel: Channel;
let community: Community;
let currentUser: User;

let db: Db;
let client: MongoClient;
let activeServer;
let port: number;
let cookie: string;

beforeAll(async () => {
  client = await createClient();
  db = client.db();
  const server = createServer({ db });
  port = await getPort();
  activeServer = await server.start({
    ...serverOptions,
    port,
  });
  currentUser = await prisma.createUser({
    username: generateUniqUsername(),
    name: "测试人员",
    description: "what happened",
    coverPhoto: "	https://yunshe-sample-1256437689.cos.ap-shanghai.myqcloud.com/cover/cover12.jpg",
    profilePhoto: "https://yunshe-sample-1256437689.cos.ap-shanghai.myqcloud.com/avatar/avatar1.jpg",
  });
  cookie = generateSessionCookie({
    passport: { user: JSON.stringify({ id: currentUser.id, name: currentUser.name }) },
  });
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
    isDefault: false,
    memberCount: 5,
  });
  context = { prisma, currentUser };
});

afterAll(async () => {
  await prisma.deleteManyChannels({ id: channel.id });
  await prisma.deleteManyCommunities({ id: community.id });
  await prisma.deleteManyUsers({ id: currentUser.id });
  await activeServer.close();
  await client.close();
});

describe("Query channel", () => {
  test("get channel info", async () => {
    const query = `
      query {
        channel(id: "${channel.id}") {
          id
          name
          community {
            name
          }
        }
      }
    `;
    const { data } = await graphql(schema, query, rootValue, context);
    expect(data).toEqual({
      channel: {
        id: channel.id,
        name: "默认频道",
        community: {
          name: "测试社区",
        },
      },
    });
  });
});

describe("Mutation Channel", () => {
  test("createChannel", async () => {
    const query = `
      mutation CreateChannel($input: CreateChannelInput!) {
        createChannel(input: $input) {
          name
        }
      }
    `;
    const variables = {
      input: {
        communityId: community.id,
        name: "新频道",
        description: "New description",
        isPrivate: false,
      },
    };
    const api = got.extend({
      baseUrl: `http://localhost:${port}`,
      responseType: "json",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Cookie": cookie,
      },
    });
    const response = await api.post("graphql", { body: JSON.stringify({ query, variables }) });
    const { data, errors } = JSON.parse(response.body);
    expect(data).toEqual({
      createChannel: null,
    });
    expect(errors[0]).toMatchObject({
      message: "没有权限",
      name: "NotAllowedError",
    });
  });

  test("updateChannel", async () => {
    const targetChannel = await prisma.createChannel({
      communityId: community.id,
      name: "默认频道",
      description: "社区创建时默认创建的我频道",
      isPrivate: false,
      isDefault: false,
      memberCount: 5,
    });
    const userChannel = await prisma.createUserChannel({
      userId: currentUser.id,
      channelId: targetChannel.id,
      communityId: targetChannel.communityId,
      role: "OWNER",
      status: "ACTIVE",
    });
    const query = `
      mutation UpdateChannel($input: UpdateChannelInput!) {
        updateChannel(input: $input) {
          description
          isDefault
          isPrivate
        }
      }
    `;
    const variables = {
      input: {
        channelId: targetChannel.id,
        description: "Updated description",
        isPrivate: true,
        isDefault: true,
      },
    };
    const api = got.extend({
      baseUrl: `http://localhost:${port}`,
      responseType: "json",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Cookie": cookie,
      },
    });
    const response = await api.post("graphql", { body: JSON.stringify({ query, variables }) });
    const { data } = JSON.parse(response.body);
    expect(data).toEqual({
      updateChannel: {
        description: "Updated description",
        isPrivate: true,
        isDefault: true,
      },
    });
    await prisma.deleteManyChannels({ id: targetChannel.id });
    await prisma.deleteManyUserChannels({ id: userChannel.id });
  });
});
