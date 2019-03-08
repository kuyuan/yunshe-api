import "./utils/env";
import { createClient } from "./utils/mongo";
import { createServer } from "./utils/server";

const client = createClient();
const server = createServer(client);
server.start();
