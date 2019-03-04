import { mergeResolvers } from "merge-graphql-schemas";
import userResolvers from './users';

const resolversMerged = mergeResolvers([
  userResolvers
]);

export default resolversMerged;
