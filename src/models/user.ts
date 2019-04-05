import { ID_Input, User, UserUpdateInput } from "@prisma/index";
import { uploadImage } from "@utils/cos";
import { File } from "@utils/interfaces";
import prisma from "@utils/prisma";

export interface EditUserInput {
  profileFile?: File;
  coverFile?: File;
  name?: string;
  description?: string;
}

export const editUser = async (userId: string, input: EditUserInput): Promise<User> => {
  const userUpdateInput: UserUpdateInput = {};
  if (input.name !== null) {
    userUpdateInput.name = input.name;
  }
  if (input.description !== null) {
    userUpdateInput.description = input.description;
  }
  if (input.coverFile) {
    const converUploadResponse = await uploadImage(input.coverFile, "User", userId);
    if (converUploadResponse.statusCode === 200) {
      userUpdateInput.coverPhoto = converUploadResponse.Location;
    }
  }
  if (input.profileFile) {
    const profileUploadResponse = await uploadImage(input.profileFile, "User", userId);
    if (profileUploadResponse.statusCode === 200) {
      userUpdateInput.profilePhoto = profileUploadResponse.Location;
    }
  }
  const user = await prisma.updateUser({ data: userUpdateInput, where: { id: userId } });
  return user;
};
