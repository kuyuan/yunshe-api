import { Channel } from "@prisma/index";
import {
  ArgumentError,
  NotAllowedError,
  NotFoundError,
} from "@utils/errors";
import { canViewChannel } from "@utils/permissions";
import { canUpdateCommunity } from "@utils/permissions";
import prisma from "@utils/prisma";

export const getChannelById = async (channlId: string, userId: string): Promise<Channel> => {
  const channel = await prisma.channel({ id: channlId });
  if (!channel || channel.deletedAt) {
    return null;
  }
  if (await canViewChannel(userId, channel)) {
    return channel;
  } else {
    return null;
  }
};

export interface UserCreateChannelInput {
  communityId: string;
  name: string;
  description?: string;
  isPrivate: boolean;
}

export const createChannel = async (userId: string, input: UserCreateChannelInput): Promise<Channel> => {
  const community = await prisma.community({ id: input.communityId });
  if (!community) {
    throw new NotFoundError();
  }
  if (await canUpdateCommunity(userId, community)) {
    const channels = await prisma.channels({ where: { communityId: community.id } });
    // Set isDefault
    let isDefault = true;
    const defaultChannel = channels.find((c) => {
      return c.isDefault === true;
    });
    if (defaultChannel) {
      isDefault = false;
    }
    // Check channel name
    if (input.name.length === 0 || input.name.length > 15) {
      throw new ArgumentError();
    }
    const duplicateName = channels.some((c) => {
      return c.name === input.name;
    });
    if (duplicateName) {
      throw new ArgumentError();
    }
    const channel = await prisma.createChannel({
      ...input,
      isDefault,
    });
    return channel;
  } else {
    throw new NotAllowedError();
  }
};
