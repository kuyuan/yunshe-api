import createClient from "../test/mongo";
import users from "./users";
import communities from "./communities";
import channels from "./channels";

export const seed = async () => {
  const client = await createClient();
  const db = client.db();
  try {
    await db.collection('users').insertMany(users)
    await db.collection('communities').insertMany(communities)
    await db.collection('channels').insertMany(channels)
  }
  catch (error) {
    console.log(error)
  }
  finally {
    await client.close()
  }
}

export const clear = async () => {
  const client = await createClient();
  const db = client.db();

  try {
    await db.dropDatabase()
  }
  catch (error) {
    console.log(error)
  }
  finally {
    await client.close()
  }
}
