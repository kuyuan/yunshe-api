const MongoClient = require('mongodb').MongoClient;

const createClient = () => {
  return new MongoClient('mongodb://localhost:27017/yunsheTest', {
    useNewUrlParser: true
  })
}

module.exports = createClient