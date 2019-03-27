import { Prisma, User } from "@prisma/index";
import { Db } from "mongodb";

/**
 * GENERAL
 */
export interface IContext {
  currentUser?: User;
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
