import { mergeTypes } from "merge-graphql-schemas";
import userTypes from "./users";

const typesMerged = mergeTypes([
  userTypes
]);

export default typesMerged;
