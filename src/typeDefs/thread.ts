import gql from "graphql-tag";

export default gql`
  enum ThreadContentType {
    EDITORJS
  }

  type ThreadContent {
    title: String
    body: String
    type: ThreadContentType
  }

  type Thread {
    id: ID
    channelId: ID
    communityId: ID
    authorId: ID
    content: ThreadContent
    isPublished: Boolean
    createdAt: Date
    updatedAt: Date
    lastActive: Date
  }

  type Query {
    thread(id: ID!): Thread
  }
`;
