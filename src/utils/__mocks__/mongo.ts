import { db, port, url } from "@support/test/config";
import { MongoClient } from "mongodb";

const mongoUrl = `mongodb://${url}:${port}/${db}`;

export const createClient = () => {
  return new MongoClient(mongoUrl, {
    useNewUrlParser: true,
  });
};
