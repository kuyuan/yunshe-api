import { Prisma } from "@prisma/index";
import { ILoader } from "@utils/loader";
import { Db, ObjectID } from "mongodb";

/**
 * GENERAL
 */
export interface IContext {
  loader?: ILoader;
  currentUser?: IUser;
  db?: Db;
  prisma?: Prisma;
}

export interface IFile {
  stream: any;
  filename: string;
  mimetype?: string;
  encoding?: string;
}

export interface ILooseObject {
  [key: string]: any;
}

export interface IUploadResponse {
  ETag: string;
  Location: string;
  headers: object;
  statusCode: number;
}

export type ConnectionTypes = "Community" | "Channel" | "Thread" | "DirectMessageThread";

export type ResourceTypes = "User" | "ThreadMessage" | "DirectMessage" | ConnectionTypes;

/**
 * MODELS
 */
export interface IUser {
  _id: ObjectID;
  createdAt: Date;
  username: string;
  name: string;
  coverPhoto: string;
  profilePhoto: string;
  wechatProviderId?: string;
  isOnline?: boolean;
  lastSeen?: Date;
  bannedAt?: Date;
  deletedAt?: Date;
  description?: string;
  website?: string;
  modifiedAt?: Date;
}

export interface ICommunity {
  _id: ObjectID;
  createdAt: Date;
  name: string;
  description: string;
  tags?: string[];
  coverPhoto: string;
  profilePhoto: string;
  website?: string;
  deletedAt?: Date;
  isPrivate: boolean;
  memberCount?: number;
}

export interface IChannel {
  _id: ObjectID;
  createdAt: Date;
  name: string;
  description: string;
  isPrivate: boolean;
  isDefault: boolean;
  memberCount: number;
  deletedAt?: Date;
  archivedAt?: Date;
}
