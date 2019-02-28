const { r } = require('rethinkdb-ts');

module.exports = async () => {
  await r.connectPool({
    db: 'testing'
  })
  await Promise.all([
    r.table('users').delete().run()
  ])
  await r.getPoolMaster().drain();
}
