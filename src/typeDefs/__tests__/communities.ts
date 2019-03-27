import { Community, Prisma } from "@prisma/index";
import { schema } from "@utils/server";
import { graphql } from "graphql";

const rootValue = {};
let context;
let community: Community;
const prisma = new Prisma({ endpoint: process.env.PRISMA_ENDPOINT });

beforeAll(async () => {
  context = { prisma };
  community = await prisma.createCommunity({
    name: "测试社区",
    description: "这是一个测试社区",
    coverPhoto: "https://yunshe-sample-1256437689.cos.ap-shanghai.myqcloud.com/cover/cover1.jpg",
    profilePhoto: "https://yunshe-sample-1256437689.cos.ap-shanghai.myqcloud.com/community/comm1.png",
    createdAt: new Date(),
    isPrivate: false,
  });
});

afterAll(async () => {
  await prisma.deleteManyCommunities({ id: community.id });
});

describe("Query community", () => {
  test("get community info", async () => {
    const query = `
      query {
        community(id: "${community.id}") {
          id
          name
        }
      }
    `;
    const { data } = await graphql(schema, query, rootValue, context);
    expect(data).toEqual({
      community: {
        id: community.id,
        name: "测试社区",
      },
    });
  });
});
