import { Cursor } from "mongodb";

export const normalizeArray = (keys: any[], indexField: string, collection: Cursor<any> | any[]) => {
  const map = new Map();
  collection.forEach((item) => {
    map.set(item[indexField], item);
  });
  return keys.map((key) => map.get(key));
};
