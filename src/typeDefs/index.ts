import { mergeTypes } from "merge-graphql-schemas";
import generalTypes from "./general";
import userTypes from "./users";

const typesMerged = mergeTypes([
  generalTypes,
  userTypes,
]);

export default typesMerged;
