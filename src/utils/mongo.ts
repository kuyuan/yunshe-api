import { MongoClient } from "mongodb";

const url = process.env.MONGO_URL;

export const createClient = () => {
  return new MongoClient(url, {
    useNewUrlParser: true,
  });
};
