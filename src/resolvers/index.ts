import { mergeResolvers } from "merge-graphql-schemas";
import communityResolvers from "./communities";
import scalarResolvers from "./scalars";
import userResolvers from "./users";

const resolversMerged = mergeResolvers([
  scalarResolvers,
  userResolvers,
  communityResolvers,
]);

export default resolversMerged;
