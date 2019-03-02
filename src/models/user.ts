import { client } from '@utils/mongo';
import { IUser } from '@utils/interfaces';
import { ObjectId } from 'mongodb';

export const getUserById = async (userId: string): Promise<IUser> => {
  await client.connect();
  const db = client.db();
  const user = await db.collection('users').findOne({
    "_id": new ObjectId(userId)
  })
  return user
};
