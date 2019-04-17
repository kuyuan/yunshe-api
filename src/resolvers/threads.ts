import {
  createThread,
  getThreadById,
  updateThread,
} from "@models/thread";
import { Thread } from "@prisma/index";
import { Context } from "@utils/interfaces";

export default {
  Query: {
    thread: async (_, { id }, { currentUser }: Context) => {
      const thread = await getThreadById(id, currentUser);
      return thread;
    },
  },
  Mutation: {
    createThread: async (_, { input }, { currentUser }: Context) => {
      const thread = await createThread(currentUser.id, input);
      return thread;
    },
    updateThread: async (_, { input }, { currentUser }: Context) => {
      const thread = await updateThread(currentUser.id, input);
      return thread;
    },
  },
  Thread: {
    author: async (thread: Thread, _, { prisma }: Context) => {
      const author = await prisma.user({ id: thread.authorId});
      return author;
    },
  },
};
