import { MongoClient } from "mongodb";
import "./utils/env";
import { createServer } from "./utils/server";

const url = process.env.MONGO_URL || "mongodb://localhost:27017/yunsheDev";

MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
  const db = client.db();
  const server = createServer({ db });
  server.start();
});
