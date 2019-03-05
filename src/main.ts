import { createClient } from "./utils/mongo";
import { createServer } from "./utils/server";

(async () => {
  const client = createClient();
  const server = await createServer(client);
  server.start();
})();
