import { getCommunitiesByIds } from "@models/community";
import { getUsersByIds } from "@models/user";
import { getChannelsByIds } from "@models/channel";
import DataLoader from "dataloader";
import { Db, ObjectID } from "mongodb";

const createLoader = (db: Db) => {
  return {
    user: new DataLoader((userIds: ObjectID[]) => getUsersByIds(userIds, db)),
    community: new DataLoader((communityIds: ObjectID[]) => getCommunitiesByIds(communityIds, db)),
    channel: new DataLoader((channelIds: ObjectID[]) => getChannelsByIds(channelIds, db))
  };
};

export default createLoader;
