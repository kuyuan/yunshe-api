import {
  WUQIAN_ID,
} from "@support/seed/constants";
import { getUserById } from "./user";

describe("getUserById", () => {
  test("it can get user data", async () => {
    const user = await getUserById(WUQIAN_ID);
    expect(user.id).toBe(WUQIAN_ID);
  });
});
test("dummy", () => {
  expect(1 + 2).toBe(3);
});
