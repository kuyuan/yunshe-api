import db from "utils/db";
import { DBUser } from "utils/interfaces";

export const getUserById = (userId: string): Promise<DBUser> => {
  return db.table("users").get(userId);
};
