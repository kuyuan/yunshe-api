import { Thread, ThreadContentType, ThreadUpdateInput, User } from "@prisma/index";
import {
  NotAllowedError,
  NotFoundError,
} from "@utils/errors";
import {
  canUpdateThread,
  canViewThread,
} from "@utils/permissions";
import prisma from "@utils/prisma";
import { getUserChannel } from "./userChannel";

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

export interface UserCreateThreadInput {
  channelId: string;
  title: string;
  body: string;
  contentType?: ThreadContentType;
  isPublished?: boolean;
}

export const createThread = async (userId: string, input: UserCreateThreadInput): Promise<Thread> => {
  const userChannel = await getUserChannel(userId, input.channelId);
  if (!userChannel || userChannel.status !== "ACTIVE") {
    throw new NotAllowedError();
  }
  const channel = await prisma.channel({ id: input.channelId });
  const thread = await prisma.createThread({
    ...input,
    communityId: channel.communityId,
    authorId: userId,
  });
  return thread;
};

export interface UserUpdateThreadInput {
  threadId: string;
  title?: string;
  body?: string;
  contentType?: ThreadContentType;
  isPublished?: boolean;
}

export const updateThread = async (userId: string, input: UserUpdateThreadInput): Promise<Thread> => {
  const thread = await prisma.thread({ id: input.threadId });
  if (await canUpdateThread(userId, thread)) {
    const updateDate: ThreadUpdateInput = {};
    if (input.title !== null) {
      updateDate.title = input.title;
    }
    if (input.body !== null) {
      updateDate.body = input.body;
    }
    if (input.contentType !== null) {
      updateDate.contentType = input.contentType;
    }
    if (input.isPublished !== null) {
      updateDate.isPublished = input.isPublished;
    }
    const updatedThread = await prisma.updateThread({
      data: updateDate,
      where: {
        id: thread.id,
      },
    });
    return updatedThread;
  } else {
    throw new NotAllowedError();
  }
};
