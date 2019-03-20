import { rule, shield } from "graphql-shield";
import { IContext } from "./interfaces";
import { NotAuthorizedError, InvalidUserError } from "./errors";

export const isValidUser = rule()(async (parent, args, { currentUser, loader }: IContext, info) => {
  if (!currentUser || !currentUser._id) {
    return new NotAuthorizedError();
  }
  const user = await loader.user.load(currentUser._id);
  if (!user || user.bannedAt || user.deletedAt) {
    return new InvalidUserError();
  }
  return true;
});

export default shield({
  Mutation: {
    editUser: isValidUser,
  },
});
