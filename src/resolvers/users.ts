import { editUser } from "@models/user";
import { IContext, IUser } from "@utils/interfaces";
import { ObjectID } from "mongodb";

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
    editUser: async (_, { input }, { currentUser, db }: IContext) => {
      const user = await editUser(currentUser._id, input, db);
      return user;
    },
  },
};
