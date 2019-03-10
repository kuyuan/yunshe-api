import { ILoader } from "@utils/loader";
import { ObjectID } from "mongodb";

export default {
  Query: {
    user: async (_, { id }, { loader }: { loader: ILoader }) => {
      const user = await loader.user.load(new ObjectID(id));
      return user;
    },
  },
};
