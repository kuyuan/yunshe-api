import {
  createChannel,
  getChannelById,
  updateChannel,
} from "@models/channel";
import { Channel } from "@prisma/index";
import { Context } from "@utils/interfaces";
import prisma from "@utils/prisma";

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
  Channel: {
    community: async (channel: Channel, _, __) => {
      const community = await prisma.community({ id: channel.communityId });
      return community;
    },
  },
};
