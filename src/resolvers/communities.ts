import { Context } from "@utils/interfaces";

export default {
  Query: {
    community: async (_, { id }, { prisma }: Context) => {
      const community = await prisma.community({ id });
      return community;
    },
  },
};
