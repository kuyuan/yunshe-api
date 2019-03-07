import { MongoClient } from "mongodb";

const url = "mongodb://localhost:27017/yunsheTest";

export const createClient = () => {
  return new MongoClient(url, {
    useNewUrlParser: true,
  });
};
