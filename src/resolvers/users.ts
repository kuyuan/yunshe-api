import { getUserById } from "@models/user";

export default {
  Query: {
    user: async (_, { id }, { db }) => {
      const user = await getUserById(id, db);
      return user;
    },
  },
};
