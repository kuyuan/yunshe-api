import createClient from "./mongo";

module.exports = async function() {
  const client = await createClient();
  await client.db().dropDatabase();
  await client.close()
};
