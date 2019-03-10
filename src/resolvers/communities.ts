import { ObjectID } from "mongodb";

export default {
  Query: {
    community: async (_, { id }, { loader }) => {
      const community = await loader.community.load(new ObjectID(id));
      return community;
    },
  },
};
