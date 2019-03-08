const MongoClient = require('mongodb').MongoClient;
const { url, port, db } = require("./config");

const createClient = () => {
  return MongoClient.connect(`mongodb://${url}:${port}/${db}`, { useNewUrlParser: true });
}

module.exports = createClient