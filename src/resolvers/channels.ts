import { ILoader } from "@utils/loader";
import { ObjectID } from "mongodb";

export default {
  Query: {
    channel: async (_, { id }, { loader }: { loader: ILoader }) => {
      const channel = await loader.channel.load(new ObjectID(id));
      return channel;
    },
  },
};
