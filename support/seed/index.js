const users = require('./users');
const communities = require('./communities');
const channels = require('./channels');
const createClient = require('../test/mongo');

const seed = async () => {
  const client = await createClient();
  const db = client.db();
  try {
    await db.collection('users').insertMany(users)
    await db.collection('communities').insertMany(communities)
    await db.collection('channels').insertMany(channels)
  }
  catch (error) {
    console.log(error)
  }
  finally {
    await client.close()
  }
}

const clear = async () => {
  const client = await createClient();
  const db = client.db();

  try {
    await db.dropDatabase()
  }
  catch (error) {
    console.log(error)
  }
  finally {
    await client.close()
  }
}

module.exports = {
  seed,
  clear
}