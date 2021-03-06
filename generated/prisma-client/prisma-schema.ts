// Code generated by Prisma (prisma@1.31.1). DO NOT EDIT.
  // Please don't change this file manually but run `prisma generate` to update it.
  // For more information, please read the docs: https://www.prisma.io/docs/prisma-client/

export const typeDefs = /* GraphQL */ `type AggregateChannel {
  count: Int!
}

type AggregateCommunity {
  count: Int!
}

type AggregateThread {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type AggregateUserChannel {
  count: Int!
}

type AggregateUserCommunity {
  count: Int!
}

type BatchPayload {
  count: Long!
}

type Channel {
  id: ID!
  communityId: ID!
  name: String!
  description: String
  isPrivate: Boolean!
  isDefault: Boolean!
  memberCount: Int
  createdAt: DateTime!
  updatedAt: DateTime!
  archivedAt: DateTime
  deletedAt: DateTime
}

type ChannelConnection {
  pageInfo: PageInfo!
  edges: [ChannelEdge]!
  aggregate: AggregateChannel!
}

input ChannelCreateInput {
  id: ID
  communityId: ID!
  name: String!
  description: String
  isPrivate: Boolean
  isDefault: Boolean!
  memberCount: Int
  archivedAt: DateTime
  deletedAt: DateTime
}

type ChannelEdge {
  node: Channel!
  cursor: String!
}

enum ChannelOrderByInput {
  id_ASC
  id_DESC
  communityId_ASC
  communityId_DESC
  name_ASC
  name_DESC
  description_ASC
  description_DESC
  isPrivate_ASC
  isPrivate_DESC
  isDefault_ASC
  isDefault_DESC
  memberCount_ASC
  memberCount_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  archivedAt_ASC
  archivedAt_DESC
  deletedAt_ASC
  deletedAt_DESC
}

type ChannelPreviousValues {
  id: ID!
  communityId: ID!
  name: String!
  description: String
  isPrivate: Boolean!
  isDefault: Boolean!
  memberCount: Int
  createdAt: DateTime!
  updatedAt: DateTime!
  archivedAt: DateTime
  deletedAt: DateTime
}

type ChannelSubscriptionPayload {
  mutation: MutationType!
  node: Channel
  updatedFields: [String!]
  previousValues: ChannelPreviousValues
}

input ChannelSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: ChannelWhereInput
  AND: [ChannelSubscriptionWhereInput!]
}

input ChannelUpdateInput {
  communityId: ID
  name: String
  description: String
  isPrivate: Boolean
  isDefault: Boolean
  memberCount: Int
  archivedAt: DateTime
  deletedAt: DateTime
}

input ChannelUpdateManyMutationInput {
  communityId: ID
  name: String
  description: String
  isPrivate: Boolean
  isDefault: Boolean
  memberCount: Int
  archivedAt: DateTime
  deletedAt: DateTime
}

input ChannelWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  communityId: ID
  communityId_not: ID
  communityId_in: [ID!]
  communityId_not_in: [ID!]
  communityId_lt: ID
  communityId_lte: ID
  communityId_gt: ID
  communityId_gte: ID
  communityId_contains: ID
  communityId_not_contains: ID
  communityId_starts_with: ID
  communityId_not_starts_with: ID
  communityId_ends_with: ID
  communityId_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  description: String
  description_not: String
  description_in: [String!]
  description_not_in: [String!]
  description_lt: String
  description_lte: String
  description_gt: String
  description_gte: String
  description_contains: String
  description_not_contains: String
  description_starts_with: String
  description_not_starts_with: String
  description_ends_with: String
  description_not_ends_with: String
  isPrivate: Boolean
  isPrivate_not: Boolean
  isDefault: Boolean
  isDefault_not: Boolean
  memberCount: Int
  memberCount_not: Int
  memberCount_in: [Int!]
  memberCount_not_in: [Int!]
  memberCount_lt: Int
  memberCount_lte: Int
  memberCount_gt: Int
  memberCount_gte: Int
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  archivedAt: DateTime
  archivedAt_not: DateTime
  archivedAt_in: [DateTime!]
  archivedAt_not_in: [DateTime!]
  archivedAt_lt: DateTime
  archivedAt_lte: DateTime
  archivedAt_gt: DateTime
  archivedAt_gte: DateTime
  deletedAt: DateTime
  deletedAt_not: DateTime
  deletedAt_in: [DateTime!]
  deletedAt_not_in: [DateTime!]
  deletedAt_lt: DateTime
  deletedAt_lte: DateTime
  deletedAt_gt: DateTime
  deletedAt_gte: DateTime
  AND: [ChannelWhereInput!]
}

input ChannelWhereUniqueInput {
  id: ID
}

type Community {
  id: ID!
  name: String!
  description: String!
  coverPhoto: String
  profilePhoto: String
  isPrivate: Boolean!
  createdAt: DateTime!
  updatedAt: DateTime!
  website: String
  tags: [String!]!
  deletedAt: DateTime
  memberCount: Int
}

type CommunityConnection {
  pageInfo: PageInfo!
  edges: [CommunityEdge]!
  aggregate: AggregateCommunity!
}

input CommunityCreateInput {
  id: ID
  name: String!
  description: String!
  coverPhoto: String
  profilePhoto: String
  isPrivate: Boolean
  website: String
  tags: CommunityCreatetagsInput
  deletedAt: DateTime
  memberCount: Int
}

input CommunityCreatetagsInput {
  set: [String!]
}

type CommunityEdge {
  node: Community!
  cursor: String!
}

enum CommunityOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  description_ASC
  description_DESC
  coverPhoto_ASC
  coverPhoto_DESC
  profilePhoto_ASC
  profilePhoto_DESC
  isPrivate_ASC
  isPrivate_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  website_ASC
  website_DESC
  deletedAt_ASC
  deletedAt_DESC
  memberCount_ASC
  memberCount_DESC
}

type CommunityPreviousValues {
  id: ID!
  name: String!
  description: String!
  coverPhoto: String
  profilePhoto: String
  isPrivate: Boolean!
  createdAt: DateTime!
  updatedAt: DateTime!
  website: String
  tags: [String!]!
  deletedAt: DateTime
  memberCount: Int
}

type CommunitySubscriptionPayload {
  mutation: MutationType!
  node: Community
  updatedFields: [String!]
  previousValues: CommunityPreviousValues
}

input CommunitySubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: CommunityWhereInput
  AND: [CommunitySubscriptionWhereInput!]
}

input CommunityUpdateInput {
  name: String
  description: String
  coverPhoto: String
  profilePhoto: String
  isPrivate: Boolean
  website: String
  tags: CommunityUpdatetagsInput
  deletedAt: DateTime
  memberCount: Int
}

input CommunityUpdateManyMutationInput {
  name: String
  description: String
  coverPhoto: String
  profilePhoto: String
  isPrivate: Boolean
  website: String
  tags: CommunityUpdatetagsInput
  deletedAt: DateTime
  memberCount: Int
}

input CommunityUpdatetagsInput {
  set: [String!]
}

input CommunityWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  description: String
  description_not: String
  description_in: [String!]
  description_not_in: [String!]
  description_lt: String
  description_lte: String
  description_gt: String
  description_gte: String
  description_contains: String
  description_not_contains: String
  description_starts_with: String
  description_not_starts_with: String
  description_ends_with: String
  description_not_ends_with: String
  coverPhoto: String
  coverPhoto_not: String
  coverPhoto_in: [String!]
  coverPhoto_not_in: [String!]
  coverPhoto_lt: String
  coverPhoto_lte: String
  coverPhoto_gt: String
  coverPhoto_gte: String
  coverPhoto_contains: String
  coverPhoto_not_contains: String
  coverPhoto_starts_with: String
  coverPhoto_not_starts_with: String
  coverPhoto_ends_with: String
  coverPhoto_not_ends_with: String
  profilePhoto: String
  profilePhoto_not: String
  profilePhoto_in: [String!]
  profilePhoto_not_in: [String!]
  profilePhoto_lt: String
  profilePhoto_lte: String
  profilePhoto_gt: String
  profilePhoto_gte: String
  profilePhoto_contains: String
  profilePhoto_not_contains: String
  profilePhoto_starts_with: String
  profilePhoto_not_starts_with: String
  profilePhoto_ends_with: String
  profilePhoto_not_ends_with: String
  isPrivate: Boolean
  isPrivate_not: Boolean
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  website: String
  website_not: String
  website_in: [String!]
  website_not_in: [String!]
  website_lt: String
  website_lte: String
  website_gt: String
  website_gte: String
  website_contains: String
  website_not_contains: String
  website_starts_with: String
  website_not_starts_with: String
  website_ends_with: String
  website_not_ends_with: String
  deletedAt: DateTime
  deletedAt_not: DateTime
  deletedAt_in: [DateTime!]
  deletedAt_not_in: [DateTime!]
  deletedAt_lt: DateTime
  deletedAt_lte: DateTime
  deletedAt_gt: DateTime
  deletedAt_gte: DateTime
  memberCount: Int
  memberCount_not: Int
  memberCount_in: [Int!]
  memberCount_not_in: [Int!]
  memberCount_lt: Int
  memberCount_lte: Int
  memberCount_gt: Int
  memberCount_gte: Int
  AND: [CommunityWhereInput!]
}

input CommunityWhereUniqueInput {
  id: ID
}

scalar DateTime

scalar Long

type Mutation {
  createChannel(data: ChannelCreateInput!): Channel!
  updateChannel(data: ChannelUpdateInput!, where: ChannelWhereUniqueInput!): Channel
  updateManyChannels(data: ChannelUpdateManyMutationInput!, where: ChannelWhereInput): BatchPayload!
  upsertChannel(where: ChannelWhereUniqueInput!, create: ChannelCreateInput!, update: ChannelUpdateInput!): Channel!
  deleteChannel(where: ChannelWhereUniqueInput!): Channel
  deleteManyChannels(where: ChannelWhereInput): BatchPayload!
  createCommunity(data: CommunityCreateInput!): Community!
  updateCommunity(data: CommunityUpdateInput!, where: CommunityWhereUniqueInput!): Community
  updateManyCommunities(data: CommunityUpdateManyMutationInput!, where: CommunityWhereInput): BatchPayload!
  upsertCommunity(where: CommunityWhereUniqueInput!, create: CommunityCreateInput!, update: CommunityUpdateInput!): Community!
  deleteCommunity(where: CommunityWhereUniqueInput!): Community
  deleteManyCommunities(where: CommunityWhereInput): BatchPayload!
  createThread(data: ThreadCreateInput!): Thread!
  updateThread(data: ThreadUpdateInput!, where: ThreadWhereUniqueInput!): Thread
  updateManyThreads(data: ThreadUpdateManyMutationInput!, where: ThreadWhereInput): BatchPayload!
  upsertThread(where: ThreadWhereUniqueInput!, create: ThreadCreateInput!, update: ThreadUpdateInput!): Thread!
  deleteThread(where: ThreadWhereUniqueInput!): Thread
  deleteManyThreads(where: ThreadWhereInput): BatchPayload!
  createUser(data: UserCreateInput!): User!
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateManyUsers(data: UserUpdateManyMutationInput!, where: UserWhereInput): BatchPayload!
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  deleteUser(where: UserWhereUniqueInput!): User
  deleteManyUsers(where: UserWhereInput): BatchPayload!
  createUserChannel(data: UserChannelCreateInput!): UserChannel!
  updateUserChannel(data: UserChannelUpdateInput!, where: UserChannelWhereUniqueInput!): UserChannel
  updateManyUserChannels(data: UserChannelUpdateManyMutationInput!, where: UserChannelWhereInput): BatchPayload!
  upsertUserChannel(where: UserChannelWhereUniqueInput!, create: UserChannelCreateInput!, update: UserChannelUpdateInput!): UserChannel!
  deleteUserChannel(where: UserChannelWhereUniqueInput!): UserChannel
  deleteManyUserChannels(where: UserChannelWhereInput): BatchPayload!
  createUserCommunity(data: UserCommunityCreateInput!): UserCommunity!
  updateUserCommunity(data: UserCommunityUpdateInput!, where: UserCommunityWhereUniqueInput!): UserCommunity
  updateManyUserCommunities(data: UserCommunityUpdateManyMutationInput!, where: UserCommunityWhereInput): BatchPayload!
  upsertUserCommunity(where: UserCommunityWhereUniqueInput!, create: UserCommunityCreateInput!, update: UserCommunityUpdateInput!): UserCommunity!
  deleteUserCommunity(where: UserCommunityWhereUniqueInput!): UserCommunity
  deleteManyUserCommunities(where: UserCommunityWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

interface Node {
  id: ID!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type Query {
  channel(where: ChannelWhereUniqueInput!): Channel
  channels(where: ChannelWhereInput, orderBy: ChannelOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Channel]!
  channelsConnection(where: ChannelWhereInput, orderBy: ChannelOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ChannelConnection!
  community(where: CommunityWhereUniqueInput!): Community
  communities(where: CommunityWhereInput, orderBy: CommunityOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Community]!
  communitiesConnection(where: CommunityWhereInput, orderBy: CommunityOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): CommunityConnection!
  thread(where: ThreadWhereUniqueInput!): Thread
  threads(where: ThreadWhereInput, orderBy: ThreadOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Thread]!
  threadsConnection(where: ThreadWhereInput, orderBy: ThreadOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ThreadConnection!
  user(where: UserWhereUniqueInput!): User
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  userChannel(where: UserChannelWhereUniqueInput!): UserChannel
  userChannels(where: UserChannelWhereInput, orderBy: UserChannelOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [UserChannel]!
  userChannelsConnection(where: UserChannelWhereInput, orderBy: UserChannelOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserChannelConnection!
  userCommunity(where: UserCommunityWhereUniqueInput!): UserCommunity
  userCommunities(where: UserCommunityWhereInput, orderBy: UserCommunityOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [UserCommunity]!
  userCommunitiesConnection(where: UserCommunityWhereInput, orderBy: UserCommunityOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserCommunityConnection!
  node(id: ID!): Node
}

type Subscription {
  channel(where: ChannelSubscriptionWhereInput): ChannelSubscriptionPayload
  community(where: CommunitySubscriptionWhereInput): CommunitySubscriptionPayload
  thread(where: ThreadSubscriptionWhereInput): ThreadSubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
  userChannel(where: UserChannelSubscriptionWhereInput): UserChannelSubscriptionPayload
  userCommunity(where: UserCommunitySubscriptionWhereInput): UserCommunitySubscriptionPayload
}

type Thread {
  id: ID!
  channelId: ID!
  communityId: ID!
  authorId: ID!
  title: String!
  body: String!
  contentType: ThreadContentType!
  isPublished: Boolean!
  createdAt: DateTime!
  updatedAt: DateTime!
  lastActive: DateTime
  deletedAt: DateTime
}

type ThreadConnection {
  pageInfo: PageInfo!
  edges: [ThreadEdge]!
  aggregate: AggregateThread!
}

enum ThreadContentType {
  EDITORJS
}

input ThreadCreateInput {
  id: ID
  channelId: ID!
  communityId: ID!
  authorId: ID!
  title: String!
  body: String!
  contentType: ThreadContentType
  isPublished: Boolean
  lastActive: DateTime
  deletedAt: DateTime
}

type ThreadEdge {
  node: Thread!
  cursor: String!
}

enum ThreadOrderByInput {
  id_ASC
  id_DESC
  channelId_ASC
  channelId_DESC
  communityId_ASC
  communityId_DESC
  authorId_ASC
  authorId_DESC
  title_ASC
  title_DESC
  body_ASC
  body_DESC
  contentType_ASC
  contentType_DESC
  isPublished_ASC
  isPublished_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  lastActive_ASC
  lastActive_DESC
  deletedAt_ASC
  deletedAt_DESC
}

type ThreadPreviousValues {
  id: ID!
  channelId: ID!
  communityId: ID!
  authorId: ID!
  title: String!
  body: String!
  contentType: ThreadContentType!
  isPublished: Boolean!
  createdAt: DateTime!
  updatedAt: DateTime!
  lastActive: DateTime
  deletedAt: DateTime
}

type ThreadSubscriptionPayload {
  mutation: MutationType!
  node: Thread
  updatedFields: [String!]
  previousValues: ThreadPreviousValues
}

input ThreadSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: ThreadWhereInput
  AND: [ThreadSubscriptionWhereInput!]
}

input ThreadUpdateInput {
  channelId: ID
  communityId: ID
  authorId: ID
  title: String
  body: String
  contentType: ThreadContentType
  isPublished: Boolean
  lastActive: DateTime
  deletedAt: DateTime
}

input ThreadUpdateManyMutationInput {
  channelId: ID
  communityId: ID
  authorId: ID
  title: String
  body: String
  contentType: ThreadContentType
  isPublished: Boolean
  lastActive: DateTime
  deletedAt: DateTime
}

input ThreadWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  channelId: ID
  channelId_not: ID
  channelId_in: [ID!]
  channelId_not_in: [ID!]
  channelId_lt: ID
  channelId_lte: ID
  channelId_gt: ID
  channelId_gte: ID
  channelId_contains: ID
  channelId_not_contains: ID
  channelId_starts_with: ID
  channelId_not_starts_with: ID
  channelId_ends_with: ID
  channelId_not_ends_with: ID
  communityId: ID
  communityId_not: ID
  communityId_in: [ID!]
  communityId_not_in: [ID!]
  communityId_lt: ID
  communityId_lte: ID
  communityId_gt: ID
  communityId_gte: ID
  communityId_contains: ID
  communityId_not_contains: ID
  communityId_starts_with: ID
  communityId_not_starts_with: ID
  communityId_ends_with: ID
  communityId_not_ends_with: ID
  authorId: ID
  authorId_not: ID
  authorId_in: [ID!]
  authorId_not_in: [ID!]
  authorId_lt: ID
  authorId_lte: ID
  authorId_gt: ID
  authorId_gte: ID
  authorId_contains: ID
  authorId_not_contains: ID
  authorId_starts_with: ID
  authorId_not_starts_with: ID
  authorId_ends_with: ID
  authorId_not_ends_with: ID
  title: String
  title_not: String
  title_in: [String!]
  title_not_in: [String!]
  title_lt: String
  title_lte: String
  title_gt: String
  title_gte: String
  title_contains: String
  title_not_contains: String
  title_starts_with: String
  title_not_starts_with: String
  title_ends_with: String
  title_not_ends_with: String
  body: String
  body_not: String
  body_in: [String!]
  body_not_in: [String!]
  body_lt: String
  body_lte: String
  body_gt: String
  body_gte: String
  body_contains: String
  body_not_contains: String
  body_starts_with: String
  body_not_starts_with: String
  body_ends_with: String
  body_not_ends_with: String
  contentType: ThreadContentType
  contentType_not: ThreadContentType
  contentType_in: [ThreadContentType!]
  contentType_not_in: [ThreadContentType!]
  isPublished: Boolean
  isPublished_not: Boolean
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  lastActive: DateTime
  lastActive_not: DateTime
  lastActive_in: [DateTime!]
  lastActive_not_in: [DateTime!]
  lastActive_lt: DateTime
  lastActive_lte: DateTime
  lastActive_gt: DateTime
  lastActive_gte: DateTime
  deletedAt: DateTime
  deletedAt_not: DateTime
  deletedAt_in: [DateTime!]
  deletedAt_not_in: [DateTime!]
  deletedAt_lt: DateTime
  deletedAt_lte: DateTime
  deletedAt_gt: DateTime
  deletedAt_gte: DateTime
  AND: [ThreadWhereInput!]
}

input ThreadWhereUniqueInput {
  id: ID
}

type User {
  id: ID!
  username: String!
  name: String!
  description: String
  website: String
  wechatProviderId: String
  coverPhoto: String
  profilePhoto: String
  createdAt: DateTime!
  updatedAt: DateTime!
  lastSeen: DateTime
  bannedAt: DateTime
  deletedAt: DateTime
}

type UserChannel {
  id: ID!
  channelId: ID!
  communityId: ID!
  userId: ID!
  status: UserChannelStatus!
  role: UserChannelRole!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type UserChannelConnection {
  pageInfo: PageInfo!
  edges: [UserChannelEdge]!
  aggregate: AggregateUserChannel!
}

input UserChannelCreateInput {
  id: ID
  channelId: ID!
  communityId: ID!
  userId: ID!
  status: UserChannelStatus!
  role: UserChannelRole!
}

type UserChannelEdge {
  node: UserChannel!
  cursor: String!
}

enum UserChannelOrderByInput {
  id_ASC
  id_DESC
  channelId_ASC
  channelId_DESC
  communityId_ASC
  communityId_DESC
  userId_ASC
  userId_DESC
  status_ASC
  status_DESC
  role_ASC
  role_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type UserChannelPreviousValues {
  id: ID!
  channelId: ID!
  communityId: ID!
  userId: ID!
  status: UserChannelStatus!
  role: UserChannelRole!
  createdAt: DateTime!
  updatedAt: DateTime!
}

enum UserChannelRole {
  OWNER
  MODERATOR
  MEMBER
}

enum UserChannelStatus {
  PENDING
  ACTIVE
  BANNED
}

type UserChannelSubscriptionPayload {
  mutation: MutationType!
  node: UserChannel
  updatedFields: [String!]
  previousValues: UserChannelPreviousValues
}

input UserChannelSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: UserChannelWhereInput
  AND: [UserChannelSubscriptionWhereInput!]
}

input UserChannelUpdateInput {
  channelId: ID
  communityId: ID
  userId: ID
  status: UserChannelStatus
  role: UserChannelRole
}

input UserChannelUpdateManyMutationInput {
  channelId: ID
  communityId: ID
  userId: ID
  status: UserChannelStatus
  role: UserChannelRole
}

input UserChannelWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  channelId: ID
  channelId_not: ID
  channelId_in: [ID!]
  channelId_not_in: [ID!]
  channelId_lt: ID
  channelId_lte: ID
  channelId_gt: ID
  channelId_gte: ID
  channelId_contains: ID
  channelId_not_contains: ID
  channelId_starts_with: ID
  channelId_not_starts_with: ID
  channelId_ends_with: ID
  channelId_not_ends_with: ID
  communityId: ID
  communityId_not: ID
  communityId_in: [ID!]
  communityId_not_in: [ID!]
  communityId_lt: ID
  communityId_lte: ID
  communityId_gt: ID
  communityId_gte: ID
  communityId_contains: ID
  communityId_not_contains: ID
  communityId_starts_with: ID
  communityId_not_starts_with: ID
  communityId_ends_with: ID
  communityId_not_ends_with: ID
  userId: ID
  userId_not: ID
  userId_in: [ID!]
  userId_not_in: [ID!]
  userId_lt: ID
  userId_lte: ID
  userId_gt: ID
  userId_gte: ID
  userId_contains: ID
  userId_not_contains: ID
  userId_starts_with: ID
  userId_not_starts_with: ID
  userId_ends_with: ID
  userId_not_ends_with: ID
  status: UserChannelStatus
  status_not: UserChannelStatus
  status_in: [UserChannelStatus!]
  status_not_in: [UserChannelStatus!]
  role: UserChannelRole
  role_not: UserChannelRole
  role_in: [UserChannelRole!]
  role_not_in: [UserChannelRole!]
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  AND: [UserChannelWhereInput!]
}

input UserChannelWhereUniqueInput {
  id: ID
}

type UserCommunity {
  id: ID!
  communityId: ID!
  userId: ID!
  status: UserCommunityStatus!
  role: UserCommunityRole!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type UserCommunityConnection {
  pageInfo: PageInfo!
  edges: [UserCommunityEdge]!
  aggregate: AggregateUserCommunity!
}

input UserCommunityCreateInput {
  id: ID
  communityId: ID!
  userId: ID!
  status: UserCommunityStatus!
  role: UserCommunityRole!
}

type UserCommunityEdge {
  node: UserCommunity!
  cursor: String!
}

enum UserCommunityOrderByInput {
  id_ASC
  id_DESC
  communityId_ASC
  communityId_DESC
  userId_ASC
  userId_DESC
  status_ASC
  status_DESC
  role_ASC
  role_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type UserCommunityPreviousValues {
  id: ID!
  communityId: ID!
  userId: ID!
  status: UserCommunityStatus!
  role: UserCommunityRole!
  createdAt: DateTime!
  updatedAt: DateTime!
}

enum UserCommunityRole {
  OWNER
  MODERATOR
  MEMBER
}

enum UserCommunityStatus {
  PENDING
  ACTIVE
  BANNED
}

type UserCommunitySubscriptionPayload {
  mutation: MutationType!
  node: UserCommunity
  updatedFields: [String!]
  previousValues: UserCommunityPreviousValues
}

input UserCommunitySubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: UserCommunityWhereInput
  AND: [UserCommunitySubscriptionWhereInput!]
}

input UserCommunityUpdateInput {
  communityId: ID
  userId: ID
  status: UserCommunityStatus
  role: UserCommunityRole
}

input UserCommunityUpdateManyMutationInput {
  communityId: ID
  userId: ID
  status: UserCommunityStatus
  role: UserCommunityRole
}

input UserCommunityWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  communityId: ID
  communityId_not: ID
  communityId_in: [ID!]
  communityId_not_in: [ID!]
  communityId_lt: ID
  communityId_lte: ID
  communityId_gt: ID
  communityId_gte: ID
  communityId_contains: ID
  communityId_not_contains: ID
  communityId_starts_with: ID
  communityId_not_starts_with: ID
  communityId_ends_with: ID
  communityId_not_ends_with: ID
  userId: ID
  userId_not: ID
  userId_in: [ID!]
  userId_not_in: [ID!]
  userId_lt: ID
  userId_lte: ID
  userId_gt: ID
  userId_gte: ID
  userId_contains: ID
  userId_not_contains: ID
  userId_starts_with: ID
  userId_not_starts_with: ID
  userId_ends_with: ID
  userId_not_ends_with: ID
  status: UserCommunityStatus
  status_not: UserCommunityStatus
  status_in: [UserCommunityStatus!]
  status_not_in: [UserCommunityStatus!]
  role: UserCommunityRole
  role_not: UserCommunityRole
  role_in: [UserCommunityRole!]
  role_not_in: [UserCommunityRole!]
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  AND: [UserCommunityWhereInput!]
}

input UserCommunityWhereUniqueInput {
  id: ID
}

type UserConnection {
  pageInfo: PageInfo!
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  id: ID
  username: String!
  name: String!
  description: String
  website: String
  wechatProviderId: String
  coverPhoto: String
  profilePhoto: String
  lastSeen: DateTime
  bannedAt: DateTime
  deletedAt: DateTime
}

type UserEdge {
  node: User!
  cursor: String!
}

enum UserOrderByInput {
  id_ASC
  id_DESC
  username_ASC
  username_DESC
  name_ASC
  name_DESC
  description_ASC
  description_DESC
  website_ASC
  website_DESC
  wechatProviderId_ASC
  wechatProviderId_DESC
  coverPhoto_ASC
  coverPhoto_DESC
  profilePhoto_ASC
  profilePhoto_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  lastSeen_ASC
  lastSeen_DESC
  bannedAt_ASC
  bannedAt_DESC
  deletedAt_ASC
  deletedAt_DESC
}

type UserPreviousValues {
  id: ID!
  username: String!
  name: String!
  description: String
  website: String
  wechatProviderId: String
  coverPhoto: String
  profilePhoto: String
  createdAt: DateTime!
  updatedAt: DateTime!
  lastSeen: DateTime
  bannedAt: DateTime
  deletedAt: DateTime
}

type UserSubscriptionPayload {
  mutation: MutationType!
  node: User
  updatedFields: [String!]
  previousValues: UserPreviousValues
}

input UserSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: UserWhereInput
  AND: [UserSubscriptionWhereInput!]
}

input UserUpdateInput {
  username: String
  name: String
  description: String
  website: String
  wechatProviderId: String
  coverPhoto: String
  profilePhoto: String
  lastSeen: DateTime
  bannedAt: DateTime
  deletedAt: DateTime
}

input UserUpdateManyMutationInput {
  username: String
  name: String
  description: String
  website: String
  wechatProviderId: String
  coverPhoto: String
  profilePhoto: String
  lastSeen: DateTime
  bannedAt: DateTime
  deletedAt: DateTime
}

input UserWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  username: String
  username_not: String
  username_in: [String!]
  username_not_in: [String!]
  username_lt: String
  username_lte: String
  username_gt: String
  username_gte: String
  username_contains: String
  username_not_contains: String
  username_starts_with: String
  username_not_starts_with: String
  username_ends_with: String
  username_not_ends_with: String
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  description: String
  description_not: String
  description_in: [String!]
  description_not_in: [String!]
  description_lt: String
  description_lte: String
  description_gt: String
  description_gte: String
  description_contains: String
  description_not_contains: String
  description_starts_with: String
  description_not_starts_with: String
  description_ends_with: String
  description_not_ends_with: String
  website: String
  website_not: String
  website_in: [String!]
  website_not_in: [String!]
  website_lt: String
  website_lte: String
  website_gt: String
  website_gte: String
  website_contains: String
  website_not_contains: String
  website_starts_with: String
  website_not_starts_with: String
  website_ends_with: String
  website_not_ends_with: String
  wechatProviderId: String
  wechatProviderId_not: String
  wechatProviderId_in: [String!]
  wechatProviderId_not_in: [String!]
  wechatProviderId_lt: String
  wechatProviderId_lte: String
  wechatProviderId_gt: String
  wechatProviderId_gte: String
  wechatProviderId_contains: String
  wechatProviderId_not_contains: String
  wechatProviderId_starts_with: String
  wechatProviderId_not_starts_with: String
  wechatProviderId_ends_with: String
  wechatProviderId_not_ends_with: String
  coverPhoto: String
  coverPhoto_not: String
  coverPhoto_in: [String!]
  coverPhoto_not_in: [String!]
  coverPhoto_lt: String
  coverPhoto_lte: String
  coverPhoto_gt: String
  coverPhoto_gte: String
  coverPhoto_contains: String
  coverPhoto_not_contains: String
  coverPhoto_starts_with: String
  coverPhoto_not_starts_with: String
  coverPhoto_ends_with: String
  coverPhoto_not_ends_with: String
  profilePhoto: String
  profilePhoto_not: String
  profilePhoto_in: [String!]
  profilePhoto_not_in: [String!]
  profilePhoto_lt: String
  profilePhoto_lte: String
  profilePhoto_gt: String
  profilePhoto_gte: String
  profilePhoto_contains: String
  profilePhoto_not_contains: String
  profilePhoto_starts_with: String
  profilePhoto_not_starts_with: String
  profilePhoto_ends_with: String
  profilePhoto_not_ends_with: String
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  lastSeen: DateTime
  lastSeen_not: DateTime
  lastSeen_in: [DateTime!]
  lastSeen_not_in: [DateTime!]
  lastSeen_lt: DateTime
  lastSeen_lte: DateTime
  lastSeen_gt: DateTime
  lastSeen_gte: DateTime
  bannedAt: DateTime
  bannedAt_not: DateTime
  bannedAt_in: [DateTime!]
  bannedAt_not_in: [DateTime!]
  bannedAt_lt: DateTime
  bannedAt_lte: DateTime
  bannedAt_gt: DateTime
  bannedAt_gte: DateTime
  deletedAt: DateTime
  deletedAt_not: DateTime
  deletedAt_in: [DateTime!]
  deletedAt_not_in: [DateTime!]
  deletedAt_lt: DateTime
  deletedAt_lte: DateTime
  deletedAt_gt: DateTime
  deletedAt_gte: DateTime
  AND: [UserWhereInput!]
}

input UserWhereUniqueInput {
  id: ID
  username: String
}
`