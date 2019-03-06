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
  createdAt: string;
  username: string;
  name: string;
  coverPhoto: string;
  profilePhoto: string;
  wechatProviderId?: string;
  isOnline?: boolean;
  lastSeen?: string;
  description?: string;
  website?: string;
  modifiedAt?: string;
}
