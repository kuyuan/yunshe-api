import {
  WUQIAN_ID,
} from "@support/seed/constants";
import { r } from "rethinkdb-ts";
import { getUserById } from "./user";

afterAll(async () => {
  await r.getPoolMaster().drain();
});

describe("getUserById", () => {
  test("it get user data", async () => {
    const user = await getUserById(WUQIAN_ID);
    expect(user.id).toBe(WUQIAN_ID);
  });
});
