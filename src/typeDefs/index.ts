import { mergeTypes } from "merge-graphql-schemas";
import channelTypes from "./channel";
import communityTypes from "./community";
import generalTypes from "./general";
import userTypes from "./users";

const typesMerged = mergeTypes([
  generalTypes,
  userTypes,
  communityTypes,
  channelTypes,
]);

export default typesMerged;
