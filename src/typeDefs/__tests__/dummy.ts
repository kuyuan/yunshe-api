import { schema } from "@utils/server";
import { graphql } from "graphql";

describe("Query dummy", () => {
  test("return dummy message", async () => {
    const query = `
      query {
        dummy
      }
    `;
    const { data } = await graphql(schema, query);
    expect(data.dummy).toBe("hello world");
  });
});
