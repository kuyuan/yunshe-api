import { createError } from "apollo-errors";

export const NotAuthorizedError = createError("NotAuthorizedError", {
  message: "没有认证",
});

export const NotAllowedError = createError("NotAllowedError", {
  message: "没有权限",
});

export const InvalidUserError = createError("InvalidUserError", {
  message: "无效用户",
});

export const NotFoundError = createError("NotFoundError", {
  message: "Not Found",
});
