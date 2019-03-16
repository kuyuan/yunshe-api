import { IContext, IUser } from "@utils/interfaces";
import { ObjectID } from "mongodb";
import { editUser } from "@models/user";

export default {
  Query: {
    user: async (_, { id }, { loader }: IContext) => {
      const user = await loader.user.load(new ObjectID(id));
      return user;
    },
    currentUser: async (_, __, { currentUser, loader }: IContext) => {
      if (!currentUser || !currentUser._id) {
        return null;
      }
      const user: IUser = await loader.user.load(currentUser._id);
      if (!user || user.bannedAt) {
        return null;
      }
      return user;
    },
  },
  Mutation: {
    editUser: async (_, { input }, { currentUser }: IContext) => {
      if (!currentUser || !currentUser._id) {
        throw new Error('error')
      }
      const user = await editUser(currentUser._id, input)
    }
  }
};
