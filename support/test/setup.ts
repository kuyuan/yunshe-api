const path = require("path");
require('dotenv').config({ path: path.resolve(".env.test") })
import createClient from "./mongo";

module.exports = async () => {
  const client = await createClient();
  await client.db().dropDatabase();
  await client.close()
};
