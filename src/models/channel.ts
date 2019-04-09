import { Channel, ChannelUpdateInput } from "@prisma/index";
import {
  ArgumentError,
  NotAllowedError,
  NotFoundError,
} from "@utils/errors";
import {
  canUpdateChannel,
  canUpdateCommunity,
  canViewChannel,
} from "@utils/permissions";
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
    await prisma.createUserChannel({
      channelId: channel.id,
      userId,
      role: "OWNER",
      status: "ACTIVE",
    });
    return channel;
  } else {
    throw new NotAllowedError();
  }
};

export interface UserUpdateChannelInput {
  channelId: string;
  description?: string;
  isPrivate?: boolean;
  isDefault?: boolean;
}

export const updateChannel = async (userId: string, input: UserUpdateChannelInput) => {
  const channel = await prisma.channel({ id: input.channelId });
  if (!channel) {
    throw new NotFoundError();
  }
  let updateDate: ChannelUpdateInput = {}
  if (await canUpdateChannel(userId, channel)) {
    // Update isDefault
    if (input.isDefault === true && channel.isDefault === false) {
      await prisma.updateManyChannels({
        data: { isDefault: false },
        where: { isDefault: true, communityId: channel.communityId },
      });
      updateDate.isDefault = true
    }
    if (input.description !== null) {
      updateDate.description = input.description
    }
    if (input.isPrivate !== null) {
      updateDate.isPrivate = input.isPrivate
    }
    const updatedChannel = await prisma.updateChannel({
      data: updateDate,
      where: { id: channel.id },
    });
    return updatedChannel;
  } else {
    throw new NotAllowedError();
  }
};
