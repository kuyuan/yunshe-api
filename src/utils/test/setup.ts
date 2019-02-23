import path from 'path';
import { migrate } from 'rethinkdb-migrate/lib';

export default async () => {
  await migrate({
    driver: 'rethinkdbdash',
    host: 'localhost',
    port: 28015,
    migrationsDirectory: path.resolve(__dirname, '../../migrations'),
    db: 'testing',
    op: 'up',
  })
}
