import session from "cookie-session";
import Keygrip from "keygrip";

if (!process.env.SESSION_COOKIE_SECRET) {
  throw new Error(
    "You have to provide the SESSION_COOKIE_SECRET environment variable.",
  );
}

export const keygrip = new Keygrip([process.env.SESSION_COOKIE_SECRET]);

export default session({
  keys: keygrip,
  name: "session",
  maxAge: 30 * 24 * 60 * 60 * 1000, // One month
});
