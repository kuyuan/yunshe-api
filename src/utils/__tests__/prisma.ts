import { Db, MongoClient, ObjectId, ObjectID } from "mongodb";
import { createClient } from "../mongo";
import prisma from "../prisma";

let db: Db;
let client: MongoClient;
let communityId: ObjectID;

describe("Native js driver", () => {
  beforeAll(async () => {
    communityId = new ObjectId();
    client = await createClient();
    db = await client.db();
    db.collection("Community").insertOne({
      _id: communityId,
      name: "db community",
      description: "test description",
      coverPhoto: "https://yunshe-sample-1256437689.cos.ap-shanghai.myqcloud.com/cover/cover1.jpg",
      profilePhoto: "https://yunshe-sample-1256437689.cos.ap-shanghai.myqcloud.com/community/comm1.png",
      isPrivate: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  });

  afterAll(async () => {
    db.collection("Community").deleteOne({ _id: communityId });
    client.close();
  });

  test("native driver created object can be accessed by prisma", async () => {
    const prismaCommunity = await prisma.community({ id: communityId.toString() });
    expect(prismaCommunity.name).toBe("db community");
  });
});
