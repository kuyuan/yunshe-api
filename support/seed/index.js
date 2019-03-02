const users = require('./users');
const createClient = require('../test/mongo');

const seed = async () => {
  const client = createClient();
  await client.connect();
  const db = client.db();
  try {
    await db.collection('users').insertMany(users)
  }
  catch (error) {
    console.log(error)
  }
  finally {
    await client.close()
  }
}

const clear = async () => {
  const client = createClient();
  await client.connect();
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