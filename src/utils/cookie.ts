import jwt from "jsonwebtoken";

export const signCookie = (cookie: string) => {
  return jwt.sign({ cookie }, process.env.API_TOKEN_SECRET, {
    expiresIn: "25y",
  });
};
