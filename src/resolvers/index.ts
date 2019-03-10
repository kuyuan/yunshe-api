import { mergeResolvers } from "merge-graphql-schemas";
import communityResolvers from "./communities";
import scalarResolvers from "./scalars";
import userResolvers from "./users";
import channelResolvers from "./channels";

const resolversMerged = mergeResolvers([
  scalarResolvers,
  userResolvers,
  communityResolvers,
  channelResolvers,
]);

export default resolversMerged;
