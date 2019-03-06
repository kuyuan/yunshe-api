/**
 * GENERAL
 */
export interface IFile {
  stream: any;
  filename: string;
  mimetype?: string;
  encoding?: string;
}

export interface ILooseObject {
  [key: string]: any;
}

export type ConnectionTypes = "Community" | "Channel" | "Thread" | "DirectMessageThread";

export type ResourceTypes = "User" | "ThreadMessage" | "DirectMessage" | ConnectionTypes;

/**
 * MODELS
 */
export interface IUser {
  _id: string;
  createdAt: Date;
  username: string;
  name: string;
  coverPhoto: string;
  profilePhoto: string;
  wechatProviderId?: string;
  isOnline?: boolean;
  lastSeen?: Date;
  description?: string;
  website?: string;
  modifiedAt?: Date;
}

export interface ICommunity {
  _id: string;
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
