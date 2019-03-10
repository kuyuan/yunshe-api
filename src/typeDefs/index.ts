import { mergeTypes } from "merge-graphql-schemas";
import generalTypes from "./general";
import userTypes from "./users";
import communityTypes from "./community";
import channelTypes from "./channel";

const typesMerged = mergeTypes([
  generalTypes,
  userTypes,
  communityTypes,
  channelTypes,
]);

export default typesMerged;
