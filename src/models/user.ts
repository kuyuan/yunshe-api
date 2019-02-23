import db from 'utils/db';
import { DBUser } from 'utils/interfaces';

export const getUserById = (userId: string) => {
  return db.table('users').get(userId)
}