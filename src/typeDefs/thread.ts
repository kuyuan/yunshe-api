import gql from "graphql-tag";

export default gql`
  enum ThreadContentType {
    EDITORJS
  }

  type Thread {
    # Basic
    id: ID
    channelId: ID
    communityId: ID
    authorId: ID
    title: String
    body: String
    contentType: ThreadContentType
    isPublished: Boolean
    createdAt: Date
    updatedAt: Date
    lastActive: Date
    # Extended
    author: User
  }

  type Query {
    thread(id: ID!): Thread
  }

  input CreateThreadInput {
    channelId: ID!
    title: String!
    body: String!
    contentType: ThreadContentType
    isPublished: Boolean
  }

  input UpdateThreadInput {
    threadId: ID!
    title: String
    body: String
    contentType: ThreadContentType
    isPublished: Boolean
  }

  type Mutation {
    createThread(input: CreateThreadInput!): Thread
    updateThread(input: UpdateThreadInput!): Thread
  }
`;
