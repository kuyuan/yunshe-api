import {
  createChannel,
  getChannelById,
  updateChannel,
} from "@models/channel";
import { Context } from "@utils/interfaces";

export default {
  Query: {
    channel: async (_, { id }, { currentUser }: Context) => {
      const channel = await getChannelById(id, currentUser && currentUser.id);
      return channel;
    },
  },
  Mutation: {
    createChannel: async (_, { input }, { currentUser }: Context) => {
      const channel = await createChannel(currentUser.id, input);
      return channel;
    },
    updateChannel: async (_, { input }, { currentUser }: Context) => {
      const channel = await updateChannel(currentUser.id, input);
      return channel;
    },
  },
};
