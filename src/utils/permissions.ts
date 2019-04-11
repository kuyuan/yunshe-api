import { getUserChannel } from "@models/userChannel";
import { getUserCommunity } from "@models/userCommunity";
import { Channel, Community, Thread, User } from "@prisma/index";
import prisma from "./prisma";

export const canViewCommunity = async (userId: string, community: Community): Promise<boolean> => {
  if (!community.isPrivate) {
    return true;
  }
  if (userId === null) {
    return false;
  }
  const userCommunities = await prisma.userCommunities({
    where: { userId, communityId: community.id, status: "ACTIVE" },
  });
  const userCommunity = userCommunities[0];
  if (!userCommunity) {
    return false;
  }
  return true;
};

export const canUpdateCommunity = async (userId: string, community: Community): Promise<boolean> => {
  if (community.deletedAt) {
    return false;
  }
  const userCommunity = await getUserCommunity(userId, community.id);
  if (userCommunity && userCommunity.status === "ACTIVE" && userCommunity.role === "OWNER") {
    return true;
  }
  return false;
};

export const canViewChannel = async (userId: string, channel: Channel): Promise<boolean> => {
  const community = await prisma.community({ id: channel.communityId });
  if (!await canViewCommunity(userId, community)) {
    return false;
  }
  if (!channel.isPrivate) {
    return true;
  }
  if (userId === null) {
    return false;
  }
  const userChannels = await prisma.userChannels({
    where: { userId, channelId: channel.id, status: "ACTIVE" },
  });
  const userChannel = userChannels[0];
  if (!userChannel) {
    return false;
  }
  return true;
};

export const canUpdateChannel = async (userId: string, channel: Channel): Promise<boolean> => {
  if (channel.deletedAt) {
    return false;
  }
  const userChannel = await getUserChannel(userId, channel.id);
  if (userChannel && userChannel.status === "ACTIVE" && userChannel.role === "OWNER") {
    return true;
  }
  return false;
};

export const canViewThread = async (user: User, thread: Thread): Promise<boolean> => {
  const channel = await prisma.channel({ id: thread.channelId });
  const community = await prisma.community({ id: thread.communityId });
  if (!channel || channel.deletedAt || !community || community.deletedAt) {
    return false;
  }
  if (!channel.isPrivate && !community.isPrivate && thread.isPublished) {
    return true;
  }
  if (!user) {
    return false;
  }
  if (user.id === thread.authorId) {
    return true;
  }
  if (channel.isPrivate) {
    const userChannel = await getUserChannel(user.id, channel.id);
    if (!userChannel || userChannel.status !== "ACTIVE") {
      return false;
    }
  }
  if (community.isPrivate) {
    const userCommunity = await getUserCommunity(user.id, community.id);
    if (!userCommunity || userCommunity.status !== "ACTIVE") {
      return false;
    }
  }
  if (!thread.isPublished) {
    return false;
  }
  return true;
};
