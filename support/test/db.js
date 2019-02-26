const rethinkdbdash = require('rethinkdbdash')

module.exports = rethinkdbdash({
  db: 'testing',
  host: 'localhost',
  port: 28015
})
