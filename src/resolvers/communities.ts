import {
  getCommunityChannels,
} from "@models/channel";
import {
  createCommunity,
  getCommunityById,
  updateCommunity,
} from "@models/community";
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
    updateCommunity: async (_, { input }, { currentUser }: Context) => {
      const community = await updateCommunity(currentUser.id, input);
      return community;
    },
  },
  Community: {
    channels: async (community, _, { currentUser }: Context) => {
      const channels = await getCommunityChannels(community, currentUser);
      return channels;
    },
  },
};
