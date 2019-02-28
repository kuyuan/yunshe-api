const path = require('path');
const { migrate } = require('rethinkdb-migrate/lib');
const seed = require('../seed');
const dotenv = require('dotenv');

module.exports = async () => {
  dotenv.config({path: '.env.test'});

  await migrate({
    driver: 'rethinkdbdash',
    host: 'localhost',
    port: 28015,
    migrationsDirectory: path.resolve(__dirname, '../migrations'),
    db: 'testing',
    op: 'up'
  })
  await seed()
}
