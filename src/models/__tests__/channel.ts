import { Community, User, UserCommunity } from "@prisma/index";
import { generateUniqUsername } from "@support/test/helpers";
import prisma from "@utils/prisma";
import { createChannel } from "../channel";

let community: Community;
let user: User;
let userCommunity: UserCommunity;

beforeAll(async () => {
  user = await prisma.createUser({
    coverPhoto: "http://www.test.com",
    profilePhoto: "http://www.test.com",
    name: "test user",
    username: generateUniqUsername(),
    description: "nothing to say",
  });
  community = await prisma.createCommunity({
    name: "测试社区",
    description: "这是一个测试社区",
    coverPhoto: "https://yunshe-sample-1256437689.cos.ap-shanghai.myqcloud.com/cover/cover1.jpg",
    profilePhoto: "https://yunshe-sample-1256437689.cos.ap-shanghai.myqcloud.com/community/comm1.png",
    isPrivate: false,
  });
  userCommunity = await prisma.createUserCommunity({
    userId: user.id,
    communityId: community.id,
    role: "OWNER",
    status: "ACTIVE",
  });
});

afterAll(async () => {
  await prisma.deleteManyCommunities({ id: community.id });
  await prisma.deleteManyUsers({ id: user.id });
  await prisma.deleteManyUserCommunities({ id: userCommunity.id });
});

describe("createChannel", () => {
  test("it create a new channel", async () => {
    const inputData = {
      name: "测试频道",
      description: "这是一个普通的频道",
      isPrivate: false,
      communityId: community.id,
    };
    const channel = await createChannel(user.id, inputData);
    expect(channel.isDefault).toBe(true);
    expect(channel.name).toBe("测试频道");
  });
});
