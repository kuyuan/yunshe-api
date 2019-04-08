import { User } from "@prisma/index";
import { generateUniqUsername } from "@support/test/helpers";
import { createClient } from "@utils/mongo";
import prisma from "@utils/prisma";
import { createServer, serverOptions } from "@utils/server";
import getPort from "get-port";
import got from "got";
import jwt from "jsonwebtoken";
import { Db, MongoClient } from "mongodb";
import { generateSessionCookie } from "../cookie";

let db: Db;
let client: MongoClient;
let activeServer;
let port: number;
let currentUser: User;
let cookie: string;
const query = `
  query {
    currentUser {
      id
      name
    }
  }
`;

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
  cookie = generateSessionCookie({
    passport: { user: JSON.stringify({ id: currentUser.id, name: currentUser.name }) },
  });
  server.express.use((req, _, next) => {
    // req.session.passport = {
    //   user: JSON.stringify({
    //     id: currentUser.id,
    //     name: currentUser.name
    //   })
    // }
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
