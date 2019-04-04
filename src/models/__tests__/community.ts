import { Community, User } from "@prisma/index";
import { generateUniqUsername } from "@support/test/helpers";
import prisma from "@utils/prisma";
import { getCommunityById, createCommunity } from "../community";
import fs from "fs";

let user: User;
let publicCommunity: Community;
let privateCommunity: Community;

beforeAll(async () => {
  user = await prisma.createUser({
    coverPhoto: "http://www.test.com",
    profilePhoto: "http://www.test.com",
    name: "test user",
    username: generateUniqUsername(),
    description: "nothing to say",
  });
  publicCommunity = await prisma.createCommunity({
    name: "测试社区",
    description: "这是一个测试社区",
    coverPhoto: "https://yunshe-sample-1256437689.cos.ap-shanghai.myqcloud.com/cover/cover1.jpg",
    profilePhoto: "https://yunshe-sample-1256437689.cos.ap-shanghai.myqcloud.com/community/comm1.png",
    isPrivate: false,
  });
  privateCommunity = await prisma.createCommunity({
    name: "私人社区",
    description: "这是一个私人社区",
    coverPhoto: "https://yunshe-sample-1256437689.cos.ap-shanghai.myqcloud.com/cover/cover2.jpg",
    profilePhoto: "https://yunshe-sample-1256437689.cos.ap-shanghai.myqcloud.com/community/comm2.png",
    isPrivate: true,
  });
});

afterAll(async () => {
  await prisma.deleteManyCommunities({ id_in: [publicCommunity.id, privateCommunity.id] });
  await prisma.deleteManyUsers({ id: user.id });
});

describe("getCommunityById", () => {
  test("when useCommunity exist it return community data", async () => {
    const userCommunity = await prisma.createUserCommunity({
      userId: user.id,
      communityId: privateCommunity.id,
      status: "ACTIVE",
      role: "OWNER",
    });
    const result = await getCommunityById(privateCommunity.id, user.id);
    expect(result.name).toBe("私人社区");
    await prisma.deleteManyUserCommunities({ id: userCommunity.id });
  });

  test("when user not connected it return null", async () => {
    const result = await getCommunityById(privateCommunity.id, user.id);
    expect(result).toBe(null);
  });

  test("when community is public, it return data", async () => {
    const result = await getCommunityById(publicCommunity.id, user.id);
    expect(result.name).toBe("测试社区");
  });
});

describe("createCommunity", () => {
  test("it create new community", async () => {
    const createCommunityInput = {
      name: "测试创建社区",
      description: "Testing",
      isPrivate: false,
      coverFile: {
        stream: fs.createReadStream("./support/files/avatar.jpg"),
        filename: "cover.jpg",
      },
      profileFile: {
        stream: fs.createReadStream("./support/files/avatar.jpg"),
        filename: "profile.jpg",
      },
    }
    const community = await createCommunity(user.id, createCommunityInput);
    expect(community.name).toBe("测试创建社区")
    expect(community.coverPhoto).toBe(`dev.myqcloud.com/community/${community.id}/cover.jpg`)
    expect(community.profilePhoto).toBe(`dev.myqcloud.com/community/${community.id}/profile.jpg`)
  })
})
