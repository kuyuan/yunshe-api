import { IUser } from "@utils/interfaces";
import { createClient } from "@utils/mongo";
import { ObjectId } from "mongodb";

export const getUserById = async (userId: ObjectId): Promise<IUser> => {
  const client = createClient();
  try {
    await client.connect();
    const db = client.db();
    const user = await db.collection("users").findOne({
      _id: userId,
    });
    return user;
  } catch (error) {
    console.log(error);
    return null;
  } finally {
    client.close();
  }
};
