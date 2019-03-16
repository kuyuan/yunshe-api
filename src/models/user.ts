import { IUser, IFile } from "@utils/interfaces";
import { normalizeByIds } from "@utils/normalize";
import Raven from "@utils/raven";
import { Db, ObjectId } from "mongodb";

export const getUserById = async (userId: ObjectId, db: Db): Promise<IUser> => {
  try {
    const user = await db.collection("users").findOne({
      _id: userId,
    });
    return user;
  } catch (error) {
    Raven.captureException(error);
    return null;
  }
};

export const getUsersByIds = async (userIds: ObjectId[], db: Db): Promise<IUser[]> => {
  try {
    const users = await db.collection("users").find({
      _id: { $in: userIds },
    });
    const normalized = await normalizeByIds(userIds, users);
    return normalized;
  } catch (error) {
    Raven.captureException(error);
    return [];
  }
};

export interface IEditUserInput {
  profileFile?: IFile;
  coverFile?: IFile;
  name?: String;
  description?: String;
}

export const editUser = async (userId: ObjectId, input: IEditUserInput, db: Db): Promise<IUser> => {
  try {
    const response = await db.collection("users").findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          name: input.name,
          description: input.description
        }
      },
      { returnOriginal: false }
    )
    return response.value
  } catch (error) {
    Raven.captureException(error);
    return null
  }
}
