import prisma from "@utils/prisma";

export const getUserCommunity = async (userId: string, communityId: string) => {
  const userCommunities = await prisma.userCommunities({ where: { userId, communityId } });
  return userCommunities[0]
}