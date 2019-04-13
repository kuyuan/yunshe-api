import { Channel, Community, Thread, User, UserChannel, UserCommunity } from "@prisma/index";
import { generateUniqUsername } from "@support/test/helpers";
import { generateSessionCookie } from "@utils/cookie";
import { createClient } from "@utils/mongo";
import prisma from "@utils/prisma";
import { createServer, serverOptions } from "@utils/server";
import getPort from "get-port";
import got from "got";
import { Db, MongoClient } from "mongodb";

let channel: Channel;
let community: Community;
let currentUser: User;
let thread: Thread;

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
  thread = await prisma.createThread({
    authorId: currentUser.id,
    channelId: channel.id,
    communityId: community.id,
    title: "测试帖子",
    body: "测试内容",
    contentType: "EDITORJS",
    isPublished: true,
  });
});

afterAll(async () => {
  await prisma.deleteManyChannels({ id: channel.id });
  await prisma.deleteManyCommunities({ id: community.id });
  await prisma.deleteManyUsers({ id: currentUser.id });
  await prisma.deleteManyThreads({ id: thread.id });
  await activeServer.close();
  await client.close();
});

describe("Query Thread", () => {
  test("thread", async () => {
    const query = `
      query {
        thread(id: "${thread.id}") {
          title
        }
      }
    `;
    const api = got.extend({
      baseUrl: `http://localhost:${port}`,
      responseType: "json",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Cookie": cookie,
      },
    });
    const response = await api.post("graphql", { body: JSON.stringify({ query }) });
    const { data, errors } = JSON.parse(response.body);
    expect(data).toEqual({
      thread: {
        title: "测试帖子",
      },
    });
  });

});

describe("Mutation createThread", () => {
  let userChannel: UserChannel;
  let userCommunity: UserCommunity;

  beforeAll(async () => {
    userChannel = await prisma.createUserChannel({
      userId: currentUser.id,
      channelId: channel.id,
      role: "MEMBER",
      status: "ACTIVE",
    });
    userCommunity = await prisma.createUserCommunity({
      userId: currentUser.id,
      communityId: community.id,
      role: "MEMBER",
      status: "ACTIVE",
    });
  });

  afterAll(async () => {
    await prisma.deleteManyUserChannels({ id: userChannel.id });
    await prisma.deleteManyUserCommunities({ id: userCommunity.id });
  });

  test("it create a new thread", async () => {
    const query = `
      mutation($input: CreateThreadInput!) {
        createThread(input: $input) {
          title
        }
      }
    `;
    const variables = {
      input: {
        channelId: channel.id,
        title: "test thread",
        body: "test body",
        isPublished: true,
        contentType: "EDITORJS",
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
      createThread: {
        title: "test thread",
      },
    });
  });
});
