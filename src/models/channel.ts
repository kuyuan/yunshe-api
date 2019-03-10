import { IChannel } from "@utils/interfaces";
import { normalizeByIds } from "@utils/normalize";
import Raven from "@utils/raven";
import { Db, ObjectID } from "mongodb";

export const getChannelById = async (channelId: ObjectID, db: Db): Promise<IChannel> => {
  try {
    const channel = await db.collection("channels").findOne({
      _id: channelId,
      deletedAt: { $exists: false },
    });
    return channel;
  } catch (error) {
    Raven.captureException(error);
    return null;
  }
};

export const getChannelsByIds = async (channelIds: ObjectID[], db: Db): Promise<IChannel[]> => {
  try {
    const channels = await db.collection("channels").find({
      _id: { $in: channelIds },
      deletedAt: { $exists: false },
    });
    const normalized = await normalizeByIds(channelIds, channels);
    return normalized;
  } catch (error) {
    Raven.captureException(error);
    return [];
  }
};
