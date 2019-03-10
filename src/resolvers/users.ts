import { ObjectID } from "mongodb";

export default {
  Query: {
    user: async (_, { id }, { loader }) => {
      const user = await loader.user.load(new ObjectID(id));
      return user;
    },
  },
};
