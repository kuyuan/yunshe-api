const rethinkdbdash = require('rethinkdbdash');

module.exports = async () => {
  const db = rethinkdbdash({
    db: 'testing'
  })
  await Promise.all([
    db.table('users').delete().run()
  ])
  await db.getPoolMaster().drain();
}
