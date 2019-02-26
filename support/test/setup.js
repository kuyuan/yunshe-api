const path = require('path');
const { migrate } = require('rethinkdb-migrate/lib');

module.exports = async () => {
  await migrate({
    driver: 'rethinkdbdash',
    host: 'localhost',
    port: 28015,
    migrationsDirectory: path.resolve(__dirname, '../migrations'),
    db: 'testing',
    op: 'up',
  })
}
