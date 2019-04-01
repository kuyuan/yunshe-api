import { User } from "@prisma/index";
import { generateUniqUsername } from "@support/test/helpers";
import { createClient } from "@utils/mongo";
import prisma from "@utils/prisma";
import { createServer, serverOptions } from "@utils/server";
import getPort from "get-port";
import got from "got";
import jwt from "jsonwebtoken";
import { Db, MongoClient } from "mongodb";

let db: Db;
let client: MongoClient;
let activeServer;
let port: number;
let currentUser: User;
const query = `
  query {
    currentUser {
      id
      name
    }
  }
`;

/**
 * req.session = { passport: { user: { id: '5c9b896224aa9a0009bf2c1c', name: '测试人员' } } }
 */
const cookie = `session=eyJwYXNzcG9ydCI\
6eyJ1c2VyIjoie1wiaWRcIjpcIjVjOWI4OTYyMj\
RhYTlhMDAwOWJmMmMxY1wiLFwibmFtZVwiOlwi5\
rWL6K+V5Lq65ZGYXCJ9In19; \
session.sig=fiL7ygPGG5P6Mb9yEXyjV-17g3w;`;

beforeAll(async () => {
  client = await createClient();
  db = client.db();
  const server = createServer({ db });
  currentUser = await prisma.createUser({
    username: generateUniqUsername(),
    name: "测试人员",
    coverPhoto: "	https://yunshe-sample-1256437689.cos.ap-shanghai.myqcloud.com/cover/cover12.jpg",
    profilePhoto: "https://yunshe-sample-1256437689.cos.ap-shanghai.myqcloud.com/avatar/avatar1.jpg",
  });
  server.express.use((req, _, next) => {
    // console.log(req.session)
    // req.session.passport = {
    //   user: JSON.stringify({
    //     id: currentUser.id,
    //     name: currentUser.name
    //   })
    // }
    // change the current user id, as the user in cookie doesn't exist, for testing only
    if (req.user && req.user.id) {
      req.user = {
        id: currentUser.id,
        name: currentUser.name,
      };
    }
    next();
  });
  port = await getPort();
  activeServer = await server.start({
    ...serverOptions,
    port,
  });
});

afterAll(async () => {
  await prisma.deleteUser({ id: currentUser.id });
  await activeServer.close();
  await client.close();
});

describe("Middleware", () => {
  test("cookie based session", async () => {
    const api = got.extend({
      baseUrl: `http://localhost:${port}`,
      responseType: "json",
      headers: {
        "Content-Type": "application/graphql",
        "Cookie": cookie,
      },
    });
    const response = await api.post("graphql", { body: query });
    expect(JSON.parse(response.body)).toEqual({
      data: {
        currentUser: {
          id: currentUser.id,
          name: currentUser.name,
        },
      },
    });
  });

  test("auth header based authentication", async () => {
    const token = `Bearer ${jwt.sign({ cookie }, process.env.API_TOKEN_SECRET)}`;
    const api = got.extend({
      baseUrl: `http://localhost:${port}`,
      responseType: "json",
      headers: {
        "Content-Type": "application/graphql",
        "Authorization": token,
      },
    });

    const response = await api.post("graphql", { body: query });
    expect(JSON.parse(response.body)).toEqual({
      data: {
        currentUser: {
          id: currentUser.id,
          name: currentUser.name,
        },
      },
    });
  });
});
