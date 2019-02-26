import { fileLoader, mergeResolvers } from "merge-graphql-schemas";
import * as path from "path";

const resolvers = fileLoader(path.join(__dirname, "./**/*.res.*"));
const resolversMerged = mergeResolvers(resolvers);

export default resolversMerged;
