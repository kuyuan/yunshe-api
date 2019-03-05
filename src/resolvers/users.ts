import { getUserById } from "@models/user";
import { ObjectID } from "mongodb";

export default {
  Query: {
    user: async (_, { id }, { db }) => {
      const user = await getUserById(new ObjectID(id), db);
      return user;
    },
  },
};
