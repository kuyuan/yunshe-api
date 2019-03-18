import { rule, shield } from "graphql-shield";
import { IContext } from "./interfaces";

export const isValidUser = rule()(async (parent, args, { currentUser, loader }: IContext, info) => {
  if (!currentUser || !currentUser._id) {
    return false;
  }
  const user = await loader.user.load(currentUser._id);
  if (!user || user.bannedAt || user.deletedAt) {
    return false;
  }
  return true;
});

export default shield({
  Mutation: {
    editUser: isValidUser,
  },
});
