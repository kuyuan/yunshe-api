import { mergeTypes } from "merge-graphql-schemas";
import communityTypes from "./community";
import generalTypes from "./general";
import userTypes from "./users";

const typesMerged = mergeTypes([
  generalTypes,
  userTypes,
  communityTypes,
]);

export default typesMerged;
