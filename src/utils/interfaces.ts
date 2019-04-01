import { Prisma, User } from "@prisma/index";
import { Db } from "mongodb";

/**
 * GENERAL
 */
export interface Context {
  currentUser?: User;
  db?: Db;
  prisma?: Prisma;
}

export interface File {
  stream: any;
  filename: string;
  mimetype?: string;
  encoding?: string;
}

export interface LooseObject {
  [key: string]: any;
}

export interface UploadResponse {
  ETag: string;
  Location: string;
  headers: object;
  statusCode: number;
}

export type ConnectionTypes = "Community" | "Channel" | "Thread" | "DirectMessageThread";

export type ResourceTypes = "User" | "ThreadMessage" | "DirectMessage" | ConnectionTypes;
