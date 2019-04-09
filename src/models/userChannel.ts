import prisma from "@utils/prisma";

export const getUserChannel = async (userId: string, channelId: string) => {
  const userChannels = await prisma.userChannels({ where: { userId, channelId } });
  return userChannels[0];
};
