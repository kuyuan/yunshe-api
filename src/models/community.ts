import { ICommunity } from "@utils/interfaces";
import { normalizeByIds } from "@utils/normalize";
import Raven from "@utils/raven";
import { Db, ObjectID } from "mongodb";

export const getCommunityById = async (communityId: ObjectID, db: Db): Promise<ICommunity> => {
  try {
    const community = await db.collection("communities").findOne({
      _id: communityId,
      deletedAt: { $exists: false },
    });
    return community;
  } catch (error) {
    Raven.captureException(error);
    return null;
  }
};

export const getCommunitiesByIds = async (communityIds: ObjectID[], db: Db): Promise<ICommunity[]> => {
  try {
    const communities = await db.collection("communities").find({
      _id: { $in: communityIds },
      deletedAt: { $exists: false },
    });
    const normalized = await normalizeByIds(communityIds, communities);
    return normalized;
  } catch (error) {
    Raven.captureException(error);
    return [];
  }
};
