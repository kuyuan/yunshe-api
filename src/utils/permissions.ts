import { getUserChannel } from "@models/userChannel";
import { getUserCommunity } from "@models/userCommunity";
import { Channel, Community } from "@prisma/index";
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
