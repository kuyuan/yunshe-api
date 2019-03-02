const MongoClient = require('mongodb').MongoClient;

const createClient = () => {
  return new MongoClient('mongodb://127.0.0.1:27017/yunsheTest', {
    useNewUrlParser: true
  })
}

module.exports = createClient