import { User } from "@prisma/index";
import prisma from "@utils/prisma";
import { schema } from "@utils/server";
import { graphql } from "graphql";

const rootValue = {};
let context;
let currentUser: User;

beforeAll(async () => {
  currentUser = await prisma.createUser({
    username: "iamtestuser",
    name: "测试人员",
    coverPhoto: "	https://yunshe-sample-1256437689.cos.ap-shanghai.myqcloud.com/cover/cover12.jpg",
    profilePhoto: "https://yunshe-sample-1256437689.cos.ap-shanghai.myqcloud.com/avatar/avatar1.jpg",
    createdAt: new Date(),
  });
  context = { prisma, currentUser };
});

afterAll(() => {
  prisma.deleteManyUsers({ id: currentUser.id });
});

describe("Query user", () => {
  test("get user info", async () => {
    const query = `
      query {
        user(id: "${currentUser.id}") {
          id
          name
        }
      }
    `;
    const { data } = await graphql(schema, query, rootValue, context);
    expect(data).toEqual({
      user: {
        id: currentUser.id,
        name: currentUser.name,
      },
    });
  });

  test("query currentUser", async () => {
    const query = `
      query {
        currentUser {
          id
          name
        }
      }
    `;
    const { data } = await graphql(schema, query, rootValue, context);
    expect(data).toEqual({
      currentUser: {
        id: currentUser.id,
        name: currentUser.name,
      },
    });
  });
});

describe("Mutation User", () => {
  let mutationUser: User;

  beforeEach(async () => {
    mutationUser = await prisma.createUser({
      username: "mutationuser",
      name: "将被修改测试人员",
      description: "自我介绍",
      coverPhoto: "	https://yunshe-sample-1256437689.cos.ap-shanghai.myqcloud.com/cover/cover11.jpg",
      profilePhoto: "https://yunshe-sample-1256437689.cos.ap-shanghai.myqcloud.com/avatar/avatar2.jpg",
      createdAt: new Date(),
    });
  });

  afterEach(async () => {
    await prisma.deleteUser({ id: mutationUser.id });
  });

  test("editUser", async () => {
    const query = `
      mutation($input: EditUserInput!) {
        editUser(input: $input) {
          id
          name
          description
        }
      }
    `;
    const params = {
      input: {
        name: "名字已经被修改",
        description: "被修改的自我介绍",
      },
    };
    context.currentUser = {
      id: mutationUser.id,
      name: "将被修改测试人员",
    };
    const { data } = await graphql(schema, query, rootValue, context, params);
    expect(data).toEqual({
      editUser: {
        id: mutationUser.id,
        name: "名字已经被修改",
        description: "被修改的自我介绍",
      },
    });
  });
});
