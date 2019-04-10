import { Thread, User } from "@prisma/index";
import {
  NotAllowedError,
  NotFoundError,
} from "@utils/errors";
import { canViewThread } from "@utils/permissions";
import prisma from "@utils/prisma";

export const getThreadById = async (threadId: string, currentUser: User): Promise<Thread> => {
  const thread = await prisma.thread({ id: threadId });
  if (!thread) {
    throw new NotFoundError();
  }
  if (await canViewThread(currentUser, thread)) {
    return thread;
  } else {
    throw new NotAllowedError();
  }
};
