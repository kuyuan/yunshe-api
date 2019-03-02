import { MongoClient } from "mongodb";

// @ts-ignore
const url = process.env.MONGO_URL || "mongodb://localhost:27017/yunsheTest";

export const createClient = () => {
  return new MongoClient(url, {
    useNewUrlParser: true,
  });
};
