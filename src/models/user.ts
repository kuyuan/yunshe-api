import { IUser } from "@utils/interfaces";
import { Db, ObjectId } from "mongodb";

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
