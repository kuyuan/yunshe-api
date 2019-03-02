import { getUserById } from "@models/user";
import { WUQIAN_ID } from "@support/seed/constants";

describe("getUserById", () => {
  test("basic", async () => {
    const user = await getUserById(WUQIAN_ID);
    expect(user.name).toBe("吴倩");
  });
});
