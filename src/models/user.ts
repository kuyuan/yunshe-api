import db from "utils/db";
import { IUser } from "utils/interfaces";

export const getUserById = (userId: string): Promise<IUser> => {
  return db.table("users").get(userId);
};
