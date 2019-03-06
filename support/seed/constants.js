const ObjectId = require('mongodb').ObjectID
const DATE = new Date('2019-01-01');

// users
const WUQIAN_ID = ObjectId("5c7aa60cb372d6355eeedae0");
const CAOYAN_ID = ObjectId("5c7aa60cb372d6355eeedae1");
const BRAN_ID = ObjectId("5c7aa60cb372d6355eeedae2");
// this user is blocked in yunshe community
const BLOCKED_USER_ID = ObjectId("5c7aa60cb372d6355eeedae4");
// this user is has never joined communities or channels
const QUIET_USER_ID = ObjectId("5c7aa60cb372d6355eeedae3");
// this user was a previous member of yunshe community
const PREVIOUS_MEMBER_USER_ID = ObjectId("5c7aa60cb372d6355eeedae5");
// this user is pending in all private channels
const PENDING_USER_ID = ObjectId("5c7aa60cb372d6355eeedae7");
// this user is moderator in all channels, member in all communities
const CHANNEL_MODERATOR_USER_ID = ObjectId("5c7aa60cb372d6355eeedae8");
// this user is moderator in all communities
const COMMUNITY_MODERATOR_USER_ID = ObjectId("5c7aa60cb372d6355eeedae9");

// communities
const YUNSHE_COMMUNITY_ID = ObjectId("5c7fcf6b2f318e679c4d5584");
const DELETED_COMMUNITY_ID = ObjectId("5c7fcf6b2f318e679c4d5585");
const PRIVATE_COMMUNITY_ID = ObjectId("5c7fcf6b2f318e679c4d5586");

// channels
const YUNSHE_GENERAL_CHANNEL_ID = ObjectId("5c7fcf6b2f318e679c4d5577");
const YUNSHE_PRIVATE_CHANNEL_ID = ObjectId("5c7fcf6b2f318e679c4d5588");
const YUNSHE_ARCHIVED_CHANNEL_ID = ObjectId("5c7fcf6b2f318e679c4d5589");
const YUNSHE_DELETED_CHANNEL_ID = ObjectId("5c7fcfa92f318e679c4d558a");
const YUNSHE_MODERATOR_CREATED_CHANNEL_ID = ObjectId("5c7fcfa92f318e679c4d558b");
const DELETED_COMMUNITY_DELETED_CHANNEL_ID = ObjectId("5c7fcfa92f318e679c4d558c");
const PRIVATE_COMMUNITY_GENERAL_CHANNEL_ID = ObjectId("5c7fcfa92f318e679c4d558d");

module.exports = {
  DATE,
  WUQIAN_ID,
  CAOYAN_ID,
  BRAN_ID,
  BLOCKED_USER_ID,
  QUIET_USER_ID,
  PREVIOUS_MEMBER_USER_ID,
  PENDING_USER_ID,
  CHANNEL_MODERATOR_USER_ID,
  COMMUNITY_MODERATOR_USER_ID,
  YUNSHE_COMMUNITY_ID,
  DELETED_COMMUNITY_ID,
  PRIVATE_COMMUNITY_ID,
  YUNSHE_GENERAL_CHANNEL_ID,
  YUNSHE_PRIVATE_CHANNEL_ID,
  YUNSHE_ARCHIVED_CHANNEL_ID,
  YUNSHE_DELETED_CHANNEL_ID,
  YUNSHE_MODERATOR_CREATED_CHANNEL_ID,
  DELETED_COMMUNITY_DELETED_CHANNEL_ID,
  PRIVATE_COMMUNITY_GENERAL_CHANNEL_ID
};
