export const dbConfig = {
  buffer: 5,
  db: process.env.DATABASE_NAME,
  host: process.env.DATABASE_HOST,
  max: 500,
  password: process.env.DATABASE_PASSWORD,
  timeoutGb: 60 * 1000,
};
