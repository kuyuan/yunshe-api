import { MongoClient } from "mongodb";
import { url, port, db } from "@support/test/config";

const mongoUrl = `mongodb://${url}:${port}/${db}`;

export const createClient = () => {
  return new MongoClient(mongoUrl, {
    useNewUrlParser: true,
  });
};
