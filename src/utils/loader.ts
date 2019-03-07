import { getCommunitiesByIds } from "@models/community";
import { getUsersByIds } from "@models/user";
import DataLoader from "dataloader";
import { Db, ObjectID } from "mongodb";

const createLoader = (db: Db) => {
  return {
    user: new DataLoader((userIds: ObjectID[]) => getUsersByIds(userIds, db)),
    community: new DataLoader((communityIds: ObjectID[]) => getCommunitiesByIds(communityIds, db)),
  };
};

export default createLoader;
