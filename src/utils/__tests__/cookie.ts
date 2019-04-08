import { generateSessionCookie } from "../cookie";

test("generateSessionCookie", () => {
  const data = { passport: { user: JSON.stringify({ id: "5c9b896224aa9a0009bf2c1c", name: "测试人员" }) } };
  expect(generateSessionCookie(data)).toBe(`session=eyJwYXNzcG9ydCI\
6eyJ1c2VyIjoie1wiaWRcIjpcIjVjOWI4OTYyMj\
RhYTlhMDAwOWJmMmMxY1wiLFwibmFtZVwiOlwi5\
rWL6K+V5Lq65ZGYXCJ9In19; \
session.sig=fiL7ygPGG5P6Mb9yEXyjV-17g3w;`);
});
