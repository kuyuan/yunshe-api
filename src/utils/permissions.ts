import { rule, shield } from "graphql-shield";
import { InvalidUserError, NotAuthorizedError } from "./errors";
import { IContext } from "./interfaces";
import prisma from "./prisma";

export const isValidUser = rule()(async (parent, args, { currentUser }: IContext, info) => {
  if (!currentUser || !currentUser.id) {
    return new NotAuthorizedError();
  }
  const user = await prisma.user({ id: currentUser.id });
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
