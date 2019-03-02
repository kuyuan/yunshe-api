import { createClient } from '@utils/mongo';
import { IUser } from '@utils/interfaces';
import { ObjectId } from 'mongodb';

export const getUserById = async (userId: ObjectId): Promise<IUser> => {
  const client = createClient()
  await client.connect();
  const db = client.db();
  const user = await db.collection('users').findOne({
    "_id": userId
  })
  return user
};
