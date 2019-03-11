import session from "cookie-session";
import express from "express";
import jwt from "jsonwebtoken";
import Keygrip from "keygrip";

export const keygrip = new Keygrip([process.env.SESSION_COOKIE_SECRET]);

export const sessionMiddleware = session({
  keys: keygrip,
  name: "session",
  maxAge: 30 * 24 * 60 * 60 * 1000, // One month
});

interface IDecodedCookie extends Object {
  cookie: string;
}

export const authHeaderMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (req.headers && !req.headers.cookie && req.headers.authorization) {
    const token = req.headers.authorization.replace(/^\s*Bearer\s*/, "");
    jwt.verify(token, process.env.API_TOKEN_SECRET, (err, decoded: IDecodedCookie) => {
      if (!err && decoded.cookie) {
        req.headers.cookie = decoded.cookie;
      }
      next();
    });
  } else {
    next();
  }
};
