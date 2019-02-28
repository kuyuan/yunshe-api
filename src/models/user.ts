import { dbConfig } from "@utils/db";
import { IUser } from "@utils/interfaces";
import { r } from "rethinkdb-ts";

export const getUserById = async (userId: string): Promise<IUser> => {
  await r.connectPool(dbConfig);
  const user = await r.table("users").get(userId).run();
  return user;
};
