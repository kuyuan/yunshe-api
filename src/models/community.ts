import { ICommunity } from "@utils/interfaces";
import { ObjectID, Db } from "mongodb";
import Raven from "@utils/raven";
import { normalizeByIds } from "@utils/normalize";

export const getCommunityById = async (communityId: ObjectID, db: Db): Promise<ICommunity> => {
  try {
    const community = await db.collection("communities").findOne({
      _id: communityId,
    });
    return community;
  } catch (error) {
    Raven.captureException(error);
    return null;
  }
}

export const getCommunitiesByIds = async (communityIds: ObjectID[], db: Db): Promise<Array<ICommunity>> => {
  try {
    const communities = await db.collection("communities").find({
      _id: { $in: communityIds },
    });
    const normalized = await normalizeByIds(communityIds, communities);
    return normalized;
  } catch (error) {
    Raven.captureException(error);
    return [];
  }
}
