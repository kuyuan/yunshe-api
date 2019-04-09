import { Channel, Community, User } from "@prisma/index";
import { generateUniqUsername } from "@support/test/helpers";
import {
  canViewChannel,
  canViewCommunity,
  canUpdateChannel
} from "@utils/permissions";
import prisma from "@utils/prisma";

let user: User;
let privateChannel: Channel;
let publicChannel: Channel;
let privateCommunity: Community;
let publicCommunity: Community;
let publicChannelPrivateCommunity: Channel;

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
});

afterAll(async () => {
  await prisma.deleteManyCommunities({ id_in: [
    privateCommunity.id, publicCommunity.id,
  ] });
  await prisma.deleteManyChannels({ id_in: [
    privateChannel.id, publicChannel.id, publicChannelPrivateCommunity.id,
  ]});
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
    expect(result).toBe(false)
  })

  test("it return true for it's own channel", async () => {
    const userChannel = await prisma.createUserChannel({
      userId: user.id,
      channelId: publicChannel.id,
      status: "ACTIVE",
      role: "OWNER"
    })
    const result = await canUpdateChannel(user.id, publicChannel);
    expect(result).toBe(true)
    await prisma.deleteManyUserChannels({ id: userChannel.id })
  })
})
