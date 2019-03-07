import { ICommunity } from "@utils/interfaces";
import { ObjectID, Db } from "mongodb";
import Raven from "@utils/raven";

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
