import { getThreadById } from "@models/thread";
import { Context } from "@utils/interfaces";

export default {
  Query: {
    thread: async (_, { id }, { currentUser }: Context) => {
      const thread = await getThreadById(id, currentUser);
      return thread;
    },
  },
};
