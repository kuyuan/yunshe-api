import session from "cookie-session";
import Keygrip from "keygrip";

export const keygrip = new Keygrip([process.env.SESSION_COOKIE_SECRET]);

export default session({
  keys: keygrip,
  name: "session",
  maxAge: 30 * 24 * 60 * 60 * 1000, // One month
});
