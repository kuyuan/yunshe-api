import jwt from "jsonwebtoken";
import { encode } from "./base64";
import { keygrip } from "./expressMiddlewares";

export const signCookie = (cookie: string) => {
  return jwt.sign({ cookie }, process.env.API_TOKEN_SECRET, {
    expiresIn: "25y",
  });
};

export const generateSessionCookie = (data: object) => {
  const encoded = encode(data);
  const encodedWithKey = `session=${encoded}`;
  return `session=${encoded}; session.sig=${keygrip.sign(encodedWithKey)};`;
};
