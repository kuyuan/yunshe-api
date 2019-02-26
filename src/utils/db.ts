import rethinkdbdash from "rethinkdbdash";

export default rethinkdbdash({
  buffer: 5,
  db: process.env.DATABASE_NAME,
  host: process.env.DATABASE_HOST,
  max: 500,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT,
  timeoutGb: 60 * 1000,
});
