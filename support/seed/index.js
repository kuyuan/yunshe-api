const users = require('./users');
const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://127.0.0.1:27017/yunsheTest'
const clientOptions = {
  useNewUrlParser: true
}

const seed = async () => {
  const client = new MongoClient(url, clientOptions);
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
  const client = new MongoClient(url, clientOptions);
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