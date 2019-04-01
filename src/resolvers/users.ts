import { UserUpdateInput } from "@prisma/index";
import { Context } from "@utils/interfaces";

export default {
  Query: {
    user: async (_, { id }, { prisma }: Context) => {
      const user = await prisma.user({ id });
      return user;
    },
    currentUser: async (_, __, { currentUser, prisma }: Context) => {
      if (!currentUser || !currentUser.id) {
        return null;
      }
      const user = await prisma.user({ id: currentUser.id });
      if (!user || user.bannedAt || user.deletedAt) {
        return null;
      }
      return user;
    },
  },
  Mutation: {
    editUser: async (_, { input }: { input: UserUpdateInput }, { currentUser, prisma }: Context) => {
      const user = await prisma.updateUser({ data: input, where: { id: currentUser.id } });
      return user;
    },
  },
};
