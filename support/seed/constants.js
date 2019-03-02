const ObjectId = require('mongodb').ObjectID
const DATE = new Date('2019-01-01');

// users
const WUQIAN_ID = ObjectId();
const CAOYAN_ID = ObjectId();
const BRAN_ID = ObjectId();
// this user is blocked in yunshe community
const BLOCKED_USER_ID = ObjectId();
// this user is has never joined communities or channels
const QUIET_USER_ID = ObjectId();
// this user was a previous member of yunshe community
const PREVIOUS_MEMBER_USER_ID = ObjectId();
// this user is pending in all private channels
const PENDING_USER_ID = ObjectId();
// this user is moderator in all channels, member in all communities
const CHANNEL_MODERATOR_USER_ID = ObjectId();
// this user is moderator in all communities
const COMMUNITY_MODERATOR_USER_ID = ObjectId();

// communities
const YUNSHE_COMMUNITY_ID = ObjectId();
const DELETED_COMMUNITY_ID = ObjectId();
const PRIVATE_COMMUNITY_ID = ObjectId();

// channels
const YUNSHE_GENERAL_CHANNEL_ID = ObjectId();
const YUNSHE_PRIVATE_CHANNEL_ID = ObjectId();
const YUNSHE_ARCHIVED_CHANNEL_ID = ObjectId();
const YUNSHE_DELETED_CHANNEL_ID = ObjectId();
const YUNSHE_MODERATOR_CREATED_CHANNEL_ID = ObjectId();
const DELETED_COMMUNITY_DELETED_CHANNEL_ID = ObjectId();
const PRIVATE_COMMUNITY_GENERAL_CHANNEL_ID = ObjectId();

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
