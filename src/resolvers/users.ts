import { ObjectID } from "mongodb";
import { IContext, IUser } from "@utils/interfaces";

export default {
  Query: {
    user: async (_, { id }, { loader }: IContext) => {
      const user = await loader.user.load(new ObjectID(id));
      return user;
    },
    currentUser: async (_, __, { currentUser, loader }: IContext) => {
      if (!currentUser || !currentUser._id) {
        return null
      }
      const user: IUser = await loader.user.load(new ObjectID(currentUser._id))
      if (!user || user.bannedAt) {
        return null
      }
      return user
    }
  },
};
