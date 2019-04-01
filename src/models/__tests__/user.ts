import { User, UserCreateInput } from "@prisma/index";
import { generateUniqUsername } from "@support/test/helpers";
import prisma from "@utils/prisma";
import fs from "fs";
import { editUser, EditUserInput } from "../user";

let user: User;
const testUser: UserCreateInput = {
  coverPhoto: "http://www.test.com",
  profilePhoto: "http://www.test.com",
  name: "test user",
  username: generateUniqUsername(),
  description: "nothing to say",
};

beforeAll(async () => {
  user = await prisma.createUser(testUser);
});

afterAll(async () => {
  await prisma.deleteManyUsers({ id: user.id });
});

describe("editUser", () => {
  test("it update user basic information", async () => {
    const editUserInput: EditUserInput = {
      name: "updated name",
      description: "updated description",
    };
    const updatedUser = await editUser(user.id, editUserInput);
    expect(updatedUser.name).toBe(editUserInput.name);
    expect(updatedUser.description).toBe(editUserInput.description);
  });

  test("it can update user images", async () => {
    const editUserInput: EditUserInput = {
      coverFile: {
        stream: fs.createReadStream("./support/files/avatar.jpg"),
        filename: "cover.jpg",
      },
      profileFile: {
        stream: fs.createReadStream("./support/files/avatar.jpg"),
        filename: "profile.jpg",
      },
    };
    const updatedUser = await editUser(user.id, editUserInput);
    expect(updatedUser.coverPhoto).toBe(`dev.myqcloud.com/user/${user.id}/cover.jpg`);
    expect(updatedUser.profilePhoto).toBe(`dev.myqcloud.com/user/${user.id}/profile.jpg`);
  });
});
