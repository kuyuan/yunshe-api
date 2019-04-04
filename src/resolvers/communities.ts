import { createCommunity, getCommunityById } from "@models/community";
import { Context } from "@utils/interfaces";

export default {
  Query: {
    community: async (_, { id }, { currentUser }: Context) => {
      const community = await getCommunityById(id, currentUser && currentUser.id);
      return community;
    },
  },
  Mutation: {
    createCommunity: async (_, { input }, { currentUser }: Context) => {
      const community = await createCommunity(currentUser.id, input);
      return community;
    },
  },
};
