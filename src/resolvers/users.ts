import { editUser } from "@models/user";
import { UserUpdateInput } from "@prisma/index";
import { Context } from "@utils/interfaces";

export default {
  Query: {
    user: async (_, { id }, { prisma }: Context) => {
      const user = await prisma.user({ id });
      return user;
    },
    currentUser: async (_, __, { currentUser, prisma }: Context) => {
      const user = await prisma.user({ id: currentUser.id });
      return user;
    },
  },
  Mutation: {
    editUser: async (_, { input }: { input: UserUpdateInput }, { currentUser }: Context) => {
      const user = await editUser(currentUser.id, input);
      return user;
    },
  },
};
