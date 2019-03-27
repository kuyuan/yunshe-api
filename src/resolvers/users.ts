import { IContext } from "@utils/interfaces";
import { UserUpdateInput } from "@prisma/index";

export default {
  Query: {
    user: async (_, { id }, { prisma }: IContext) => {
      const user = await prisma.user({ id })
      return user;
    },
    currentUser: async (_, __, { currentUser, prisma }: IContext) => {
      if (!currentUser || !currentUser.id) {
        return null;
      }
      const user = await prisma.user({ id: currentUser.id })
      if (!user || user.bannedAt || user.deletedAt) {
        return null;
      }
      return user;
    },
  },
  Mutation: {
    editUser: async (_, { input }: { input: UserUpdateInput }, { currentUser, prisma }: IContext) => {
      const user = await prisma.updateUser({ data: input, where: { id: currentUser.id } })
      return user;
    },
  },
};
