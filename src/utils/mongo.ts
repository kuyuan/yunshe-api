import { MongoClient } from "mongodb";

const url = process.env.MONGO_URL;

export const createClient = () => {
  return MongoClient.connect(process.env.MONGO_URL, { useNewUrlParser: true });
};
