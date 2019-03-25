import {
  DATE,
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
} from "./constants";

export default [
  {
    _id: YUNSHE_GENERAL_CHANNEL_ID,
    communityId: YUNSHE_COMMUNITY_ID,
    createdAt: DATE,
    name: '默认频道',
    description: '社区创建时默认创建的我频道',
    isPrivate: false,
    isDefault: true,
    memberCount: 5
  },
  {
    _id: YUNSHE_PRIVATE_CHANNEL_ID,
    communityId: YUNSHE_COMMUNITY_ID,
    createdAt: DATE,
    name: '私人频道',
    description: '必须受邀通过验证才能加入',
    isPrivate: true,
    isDefault: false,
    memberCount: 4
  },
  {
    _id: YUNSHE_ARCHIVED_CHANNEL_ID,
    communityId: YUNSHE_COMMUNITY_ID,
    createdAt: DATE,
    name: '归档频道',
    description: '归档之后社区进入只读模式',
    isPrivate: false,
    isDefault: false,
    memberCount: 6
  },
  {
    _id: YUNSHE_DELETED_CHANNEL_ID,
    communityId: YUNSHE_COMMUNITY_ID,
    createdAt: DATE,
    name: '已删除频道',
    description: '删除的频道不会在任何界面显示，同时不能进行任何行动',
    isPrivate: false,
    isDefault: false,
    memberCount: 7,
    deletedAt: DATE
  },
  {
    _id: YUNSHE_MODERATOR_CREATED_CHANNEL_ID,
    communityId: YUNSHE_COMMUNITY_ID,
    createdAt: DATE,
    name: '管理者创建社区',
    description: '社区管理者创建的频道',
    isPrivate: false,
    isDefault: false,
    memberCount: 1
  },
  {
    _id: DELETED_COMMUNITY_DELETED_CHANNEL_ID,
    communityId: DELETED_COMMUNITY_ID,
    createdAt: DATE,
    name: '已删除频道',
    description: '改频道已经被删除，同时该频道也已经被删除',
    isPrivate: false,
    isDefault: false,
    memberCount: 2,
    deletedAt: DATE
  },
  {
    _id: PRIVATE_COMMUNITY_GENERAL_CHANNEL_ID,
    communityId: PRIVATE_COMMUNITY_ID,
    createdAt: DATE,
    name: '私人社区频道',
    description: '私人社区默认创建的频道',
    isPrivate: false,
    isDefault: true,
    memberCount: 1
  }
]