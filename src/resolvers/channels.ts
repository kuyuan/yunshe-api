import { Context } from "@utils/interfaces";

export default {
  Query: {
    channel: async (_, { id }, { prisma }: Context) => {
      const channel = await prisma.channel({ id });
      return channel;
    },
  },
};
