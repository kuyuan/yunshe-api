import { MongoClient } from "mongodb";
import { url, port, db } from "./config";

export default () => {
  return MongoClient.connect(`mongodb://${url}:${port}/${db}`, { useNewUrlParser: true });
}
