import { getChannelById } from "@models/channel";
import { Context } from "@utils/interfaces";

export default {
  Query: {
    channel: async (_, { id }, { currentUser }: Context) => {
      const channel = await getChannelById(id, currentUser && currentUser.id);
      return channel;
    },
  },
};
