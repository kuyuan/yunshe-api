import { fileLoader, mergeTypes } from "merge-graphql-schemas";
import * as path from "path";

const typeArray = fileLoader(path.join(__dirname, "./**/*.gql"));
const typesMerged = mergeTypes(typeArray, { all: true });

export default typesMerged;
