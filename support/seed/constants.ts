import { ObjectId } from "mongodb";

export const DATE = new Date('2019-01-01');

// users
export const WUQIAN_ID = new ObjectId("5c7aa60cb372d6355eeedae0");
export const CAOYAN_ID = new ObjectId("5c7aa60cb372d6355eeedae1");
export const BRAN_ID = new ObjectId("5c7aa60cb372d6355eeedae2");
// this user is blocked in yunshe community
export const BLOCKED_USER_ID = new ObjectId("5c7aa60cb372d6355eeedae4");
// this user is has never joined communities or channels
export const QUIET_USER_ID = new ObjectId("5c7aa60cb372d6355eeedae3");
// this user was a previous member of yunshe community
export const PREVIOUS_MEMBER_USER_ID = new ObjectId("5c7aa60cb372d6355eeedae5");
// this user is pending in all private channels
export const PENDING_USER_ID = new ObjectId("5c7aa60cb372d6355eeedae7");
// this user is moderator in all channels, member in all communities
export const CHANNEL_MODERATOR_USER_ID = new ObjectId("5c7aa60cb372d6355eeedae8");
// this user is moderator in all communities
export const COMMUNITY_MODERATOR_USER_ID = new ObjectId("5c7aa60cb372d6355eeedae9");

// communities
export const YUNSHE_COMMUNITY_ID = new ObjectId("5c7fcf6b2f318e679c4d5584");
export const DELETED_COMMUNITY_ID = new ObjectId("5c7fcf6b2f318e679c4d5585");
export const PRIVATE_COMMUNITY_ID = new ObjectId("5c7fcf6b2f318e679c4d5586");

// channels
export const YUNSHE_GENERAL_CHANNEL_ID = new ObjectId("5c7fcf6b2f318e679c4d5577");
export const YUNSHE_PRIVATE_CHANNEL_ID = new ObjectId("5c7fcf6b2f318e679c4d5588");
export const YUNSHE_ARCHIVED_CHANNEL_ID = new ObjectId("5c7fcf6b2f318e679c4d5589");
export const YUNSHE_DELETED_CHANNEL_ID = new ObjectId("5c7fcfa92f318e679c4d558a");
export const YUNSHE_MODERATOR_CREATED_CHANNEL_ID = new ObjectId("5c7fcfa92f318e679c4d558b");
export const DELETED_COMMUNITY_DELETED_CHANNEL_ID = new ObjectId("5c7fcfa92f318e679c4d558c");
export const PRIVATE_COMMUNITY_GENERAL_CHANNEL_ID = new ObjectId("5c7fcfa92f318e679c4d558d");
