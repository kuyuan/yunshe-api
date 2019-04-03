import { Channel, Community } from "@prisma/index";
import prisma from "./prisma";

export const canViewCommunity = async (userId: string, community: Community): Promise<boolean> => {
  if (!community.isPrivate) {
    return true;
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

export const canViewChannel = async (userId: string, channel: Channel): Promise<boolean> => {
  const community = await prisma.community({ id: channel.communityId });
  if (!await canViewCommunity(userId, community)) {
    return false
  }
  if (!channel.isPrivate) {
    return true;
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
