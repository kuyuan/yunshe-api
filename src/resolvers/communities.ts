import { IContext } from "@utils/interfaces";

export default {
  Query: {
    community: async (_, { id }, { prisma }: IContext) => {
      const community = await prisma.community({ id })
      return community;
    },
  },
};
