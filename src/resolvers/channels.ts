import { IContext } from "@utils/interfaces";

export default {
  Query: {
    channel: async (_, { id }, { prisma }: IContext) => {
      const channel = await prisma.channel({ id })
      return channel
    },
  },
};
