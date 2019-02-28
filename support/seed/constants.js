const DATE = 1483225200000;

// users
const WUQIAN_ID = '1';
const CAOYAN_ID = '2';
const BRAN_ID = '3';
// this user is blocked in yunshe community
const BLOCKED_USER_ID = '4';
// this user is has never joined communities or channels
const QUIET_USER_ID = '5';
// this user was a previous member of yunshe community
const PREVIOUS_MEMBER_USER_ID = '6';
// this user is pending in all private channels
const PENDING_USER_ID = '7';
// this user is moderator in all channels, member in all communities
const CHANNEL_MODERATOR_USER_ID = '8';
// this user is moderator in all communities
const COMMUNITY_MODERATOR_USER_ID = '9';

// communities
const YUNSHE_COMMUNITY_ID = '1';
const DELETED_COMMUNITY_ID = '2';
const PRIVATE_COMMUNITY_ID = '3';

// channels
const YUNSHE_GENERAL_CHANNEL_ID = '1';
const YUNSHE_PRIVATE_CHANNEL_ID = '2';
const YUNSHE_ARCHIVED_CHANNEL_ID = '3';
const YUNSHE_DELETED_CHANNEL_ID = '4';
const YUNSHE_MODERATOR_CREATED_CHANNEL_ID = '6';
const DELETED_COMMUNITY_DELETED_CHANNEL_ID = '5';
const PRIVATE_COMMUNITY_GENERAL_CHANNEL_ID = '7';

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
