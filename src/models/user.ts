import { IUser } from "@utils/interfaces";
import { normalizeArray } from "@utils/normalize";
import { Cursor, Db, ObjectId } from "mongodb";

export const getUserById = async (userId: ObjectId, db: Db): Promise<IUser> => {
  try {
    const user = await db.collection("users").findOne({
      _id: userId,
    });
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getUsersByIds = async (userIds: ObjectId[], db: Db): Promise<IUser[]> => {
  try {
    const users = await db.collection("users").find({
      _id: { $in: userIds },
    });
    const normalized = normalizeArray(userIds, "_id", users);
    return normalized;
  } catch (error) {
    console.log(error);
    return null;
  }
};
