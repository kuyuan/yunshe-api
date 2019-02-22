require('dotenv').config()

module.exports = {
  driver: 'rethinkdbdash',
  db: process.env.DATABASE_NAME,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  migrationsDirectory: 'src/migrations',
  password: process.env.DATABASE_PASSWORD
}
