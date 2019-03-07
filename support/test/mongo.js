const MongoClient = require('mongodb').MongoClient;
const { url, port, db } = require("./config");

const createClient = () => {
  return new MongoClient(`mongodb://${url}:${port}/${db}`, {
    useNewUrlParser: true
  })
}

module.exports = createClient