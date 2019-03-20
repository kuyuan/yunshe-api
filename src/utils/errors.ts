import { createError } from "apollo-errors";

export const NotAuthorizedError = createError("NotAuthorizedError", {
  message: "没有认证",
});

export const InvalidUserError = createError("InvalidUserError", {
  message: "无效用户",
});
