import {
  WUQIAN_ID,
} from "@support/seed/constants";
import { getUserById } from "./user";
import { r } from 'rethinkdb-ts';

afterAll(async () => {
  await r.getPoolMaster().drain()
})

describe("getUserById", () => {
  test("it get user data", async () => {
    const user = await getUserById(WUQIAN_ID);
    expect(user.id).toBe(WUQIAN_ID);
  });
});
