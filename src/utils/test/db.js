const rethinkdbdash = require('rethinkdbdash')

module.exports = rethinkdbdash({
  db: 'testing',
  max: 500,
  buffer: 5,
  timeoutGb: 60 * 1000,
  host: 'localhost',
  port: 28015
})
