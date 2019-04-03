import { Channel } from "@prisma/index";
import { canViewChannel } from "@utils/permissions";
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
