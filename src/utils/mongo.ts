import { MongoClient } from 'mongodb';

// @ts-ignore
const url = process.env.MONGO_URL || global.__MONGO_URI__ || 'mongodb://localhost:27017/dev';

export const client = new MongoClient(url);
