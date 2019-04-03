import { Community } from "@prisma/index";
import { canViewCommunity } from "@utils/permissions";
import prisma from "@utils/prisma";

export const getCommunityById = async (communityId: string, userId: string): Promise<Community> => {
  const community = await prisma.community({ id: communityId });
  if (!community || community.deletedAt) {
    return null;
  }
  if (await canViewCommunity(userId, community)) {
    return community;
  } else {
    return null;
  }
};
