import { mergeResolvers } from "merge-graphql-schemas";
import channelResolvers from "./channels";
import communityResolvers from "./communities";
import dummyResolver from "./dummy";
import scalarResolvers from "./scalars";
import userResolvers from "./users";

const resolversMerged = mergeResolvers([
  scalarResolvers,
  userResolvers,
  communityResolvers,
  channelResolvers,
  dummyResolver,
]);

export default resolversMerged;
