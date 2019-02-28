const { r } = require('rethinkdb-ts');
const users = require('./users');

const seed = async () => {
  await r.connectPool({
    db: 'testing'
  })
  await Promise.all([
    r.table('users').insert(users).run()
  ])
  await r.getPoolMaster().drain();
}

module.exports = seed