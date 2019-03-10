import { mergeResolvers } from "merge-graphql-schemas";
import channelResolvers from "./channels";
import communityResolvers from "./communities";
import scalarResolvers from "./scalars";
import userResolvers from "./users";

const resolversMerged = mergeResolvers([
  scalarResolvers,
  userResolvers,
  communityResolvers,
  channelResolvers,
]);

export default resolversMerged;
