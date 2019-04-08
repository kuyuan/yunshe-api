import { decode, encode } from "../base64";

test("encode", () => {
  expect(encode({hello: "world"})).toBe("eyJoZWxsbyI6IndvcmxkIn0=");
});

test("decode", () => {
  expect(decode("eyJoZWxsbyI6IndvcmxkIn0=")).toEqual({
    hello: "world",
  });
});
