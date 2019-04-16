import { Channel, Community, Thread, User } from "@prisma/index";
import { generateUniqUsername } from "@support/test/helpers";
import {
  canUpdateChannel,
  canViewChannel,
  canViewCommunity,
  canViewThread,
} from "@utils/permissions";
import prisma from "@utils/prisma";

let user: User;
let privateChannel: Channel;
let publicChannel: Channel;
let privateCommunity: Community;
let publicCommunity: Community;
let publicChannelPrivateCommunity: Channel;
let publicThread: Thread;
let publicNotPublishedThread: Thread;
let privateThread: Thread;

beforeAll(async () => {
  user = await prisma.createUser({
    username: generateUniqUsername(),
    name: "测试人员",
    description: "what happened",
    coverPhoto: "	https://yunshe-sample-1256437689.cos.ap-shanghai.myqcloud.com/cover/cover12.jpg",
    profilePhoto: "https://yunshe-sample-1256437689.cos.ap-shanghai.myqcloud.com/avatar/avatar1.jpg",
  });
  privateCommunity = await prisma.createCommunity({
    name: "私人社区",
    description: "这是一个私人社区",
    coverPhoto: "https://yunshe-sample-1256437689.cos.ap-shanghai.myqcloud.com/cover/cover1.jpg",
    profilePhoto: "https://yunshe-sample-1256437689.cos.ap-shanghai.myqcloud.com/community/comm1.png",
    isPrivate: true,
  });
  publicCommunity = await prisma.createCommunity({
    name: "公共社区",
    description: "这是一个公共社区",
    coverPhoto: "https://yunshe-sample-1256437689.cos.ap-shanghai.myqcloud.com/cover/cover2.jpg",
    profilePhoto: "https://yunshe-sample-1256437689.cos.ap-shanghai.myqcloud.com/community/comm2.png",
    isPrivate: false,
  });
  privateChannel = await prisma.createChannel({
    communityId: publicCommunity.id,
    name: "私人频道",
    description: "需要申请加入的频道",
    isPrivate: true,
    isDefault: false,
    memberCount: 5,
  });
  publicChannel = await prisma.createChannel({
    communityId: publicCommunity.id,
    name: "公共频道",
    description: "开放的频道",
    isPrivate: false,
    isDefault: false,
    memberCount: 5,
  });
  publicChannelPrivateCommunity = await prisma.createChannel({
    communityId: privateCommunity.id,
    name: "公共频道",
    description: "开放的频道",
    isPrivate: false,
    isDefault: false,
    memberCount: 5,
  });
  publicThread = await prisma.createThread({
    authorId: user.id,
    channelId: publicChannel.id,
    communityId: publicCommunity.id,
    title: "测试帖子",
    body: "测试内容",
    contentType: "EDITORJS",
    isPublished: true,
  });
  publicNotPublishedThread = await prisma.createThread({
    authorId: user.id,
    channelId: publicChannel.id,
    communityId: publicCommunity.id,
    title: "测试帖子",
    body: "测试内容",
    contentType: "EDITORJS",
    isPublished: false,
  });
  privateThread = await prisma.createThread({
    authorId: user.id,
    channelId: privateChannel.id,
    communityId: privateCommunity.id,
    title: "测试帖子",
    body: "测试内容",
    contentType: "EDITORJS",
    isPublished: true,
  });
});

afterAll(async () => {
  await prisma.deleteManyCommunities({ id_in: [
    privateCommunity.id, publicCommunity.id,
  ] });
  await prisma.deleteManyChannels({ id_in: [
    privateChannel.id, publicChannel.id, publicChannelPrivateCommunity.id,
  ] });
  await prisma.deleteManyUsers({ id_in: [
    user.id,
  ] });
  await prisma.deleteManyThreads({ id_in: [
    publicThread.id, publicNotPublishedThread.id, privateThread.id,
  ] });
});

describe("canViewCommunity", () => {
  describe("for public community", () => {
    test("it return true", async () => {
      const result = await canViewCommunity(user.id, publicCommunity);
      expect(result).toBe(true);
    });
  });

  describe("for private community", () => {
    test("it return false if not enrolled", async () => {
      const result = await canViewCommunity(user.id, privateCommunity);
      expect(result).toBe(false);
    });

    test("it return true if enrolled", async () => {
      const userCommunity = await prisma.createUserCommunity({
        userId: user.id,
        communityId: privateCommunity.id,
        status: "ACTIVE",
        role: "MEMBER",
      });
      const result = await canViewCommunity(user.id, privateCommunity);
      expect(result).toBe(true);
      await prisma.deleteUserCommunity({ id: userCommunity.id });
    });
  });
});

describe("canViewChannel", () => {
  describe("for public channel", () => {
    test("it return true", async () => {
      const result = await canViewChannel(user.id, publicChannel);
      expect(result).toBe(true);
    });
  });

  describe("for private channel", () => {
    test("it return false", async () => {
      const result = await canViewChannel(user.id, privateChannel);
      expect(result).toBe(false);
    });

    test("it return true if enrolled in both community and channel", async () => {
      const userCommunity = await prisma.createUserCommunity({
        userId: user.id,
        communityId: privateCommunity.id,
        status: "ACTIVE",
        role: "MEMBER",
      });
      const userChannel = await prisma.createUserChannel({
        userId: user.id,
        channelId: privateChannel.id,
        communityId: privateChannel.communityId,
        status: "ACTIVE",
        role: "MEMBER",
      });
      const result = await canViewChannel(user.id, privateChannel);
      expect(result).toBe(true);
      await prisma.deleteUserCommunity({ id: userCommunity.id });
      await prisma.deleteUserChannel({ id: userChannel.id });
    });
  });
});

describe("canUpdateChannel", () => {
  test("it return false for other's channel", async () => {
    const result = await canUpdateChannel(user.id, publicChannel);
    expect(result).toBe(false);
  });

  test("it return true for it's own channel", async () => {
    const userChannel = await prisma.createUserChannel({
      userId: user.id,
      channelId: publicChannel.id,
      communityId: publicChannel.communityId,
      status: "ACTIVE",
      role: "OWNER",
    });
    const result = await canUpdateChannel(user.id, publicChannel);
    expect(result).toBe(true);
    await prisma.deleteManyUserChannels({ id: userChannel.id });
  });
});

describe("canViewThread", () => {
  let threadUser: User;

  beforeAll(async () => {
    threadUser = await prisma.createUser({
      username: generateUniqUsername(),
      name: "测试人员",
      description: "what happened",
      coverPhoto: "	https://yunshe-sample-1256437689.cos.ap-shanghai.myqcloud.com/cover/cover12.jpg",
      profilePhoto: "https://yunshe-sample-1256437689.cos.ap-shanghai.myqcloud.com/avatar/avatar1.jpg",
    });
  });

  afterAll(async () => {
    await prisma.deleteUser({ id: threadUser.id });
  });

  test("anyone can view public thread", async () => {
    const result = await canViewThread(null, publicThread);
    expect(result).toBe(true);
  });

  test("private thread is protected", async () => {
    const result = await canViewThread(threadUser, privateThread);
    expect(result).toBe(false);
  });

  test("not published thread is not visible to other people", async () => {
    const result = await canViewThread(threadUser, publicNotPublishedThread);
    expect(result).toBe(false);
  });

  test("not published thread is only visible to author", async () => {
    const result = await canViewThread(user, publicNotPublishedThread);
    expect(result).toBe(true);
  });

  test("authed user can view private thread", async () => {
    const userChannel = await prisma.createUserChannel({
      userId: threadUser.id,
      channelId: privateChannel.id,
      communityId: privateChannel.communityId,
      status: "ACTIVE",
      role: "MEMBER",
    });
    const userCommunity = await prisma.createUserCommunity({
      userId: threadUser.id,
      communityId: privateCommunity.id,
      status: "ACTIVE",
      role: "MEMBER",
    });
    const result = await canViewThread(threadUser, privateThread);
    expect(result).toBe(true);
    await prisma.deleteUserChannel({ id: userChannel.id });
    await prisma.deleteUserCommunity({ id: userCommunity.id });
  });
});
