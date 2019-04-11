import { mergeResolvers } from "merge-graphql-schemas";
import channelResolvers from "./channels";
import communityResolvers from "./communities";
import dummyResolver from "./dummy";
import scalarResolvers from "./scalars";
import userResolvers from "./users";
import threadResolver from "./threads";

const resolversMerged = mergeResolvers([
  scalarResolvers,
  userResolvers,
  threadResolver,
  communityResolvers,
  channelResolvers,
  dummyResolver,
]);

export default resolversMerged;
