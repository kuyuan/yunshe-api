import { ILoader } from "@utils/loader";
import { ObjectID } from "mongodb";

export default {
  Query: {
    community: async (_, { id }, { loader }: { loader: ILoader }) => {
      const community = await loader.community.load(new ObjectID(id));
      return community;
    },
  },
};
