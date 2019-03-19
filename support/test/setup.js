const path = require("path");
require('dotenv').config({ path: path.resolve(".env.test") })
const seed = require('../seed').seed;
const { MongoMemoryServer } = require('mongodb-memory-server');
const { port } = require("./config");

const mongod = new MongoMemoryServer({
  autoStart: false,
  instance: {
    port
  },
  binary: {
    version: "4.0.6"
  }
});

module.exports = async () => {
  if (!mongod.isRunning) {
    await mongod.start();
  }

  await seed()

  global.__MONGOD__ = mongod;
};
