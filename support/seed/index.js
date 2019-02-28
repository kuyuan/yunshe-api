const rethinkdbdash = require('rethinkdbdash');
const users = require('./users');

const seed = async () => {
  const db = rethinkdbdash({
    db: 'testing'
  })
  await Promise.all([
    db.table('users').insert(users).run()
  ])
  await db.getPoolMaster().drain();
}

module.exports = seed