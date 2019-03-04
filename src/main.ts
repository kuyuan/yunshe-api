import { createServer } from "./utils/server";

(async () => {
  const server = await createServer();
  server.start();
})();
