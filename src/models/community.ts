import { Community } from "@prisma/index";
import prisma from "@utils/prisma";

export const getCommunityById = async (communityId: string, userId: string): Promise<Community> => {
  const community = await prisma.community({ id: communityId });
  if (!community || community.deletedAt) {
    return null;
  }
  if (community && community.isPrivate) {
    const userCommunities = await prisma.userCommunities({ where: { userId, communityId, status: "ACTIVE" } });
    const userCommunity = userCommunities[0];
    if (!userCommunity) {
      return null;
    }
  }
  return community;
};
