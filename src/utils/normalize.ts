import { Cursor, ObjectID } from "mongodb";

export const normalizeByIds = async (keys: ObjectID[], collection: Cursor<any>) => {
  const map = new Map();
  await collection.forEach((item) => {
    map.set(item._id.toString(), item);
  });
  return keys.map((key) => map.get(key.toString()));
};
