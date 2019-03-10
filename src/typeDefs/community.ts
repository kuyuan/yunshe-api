import gql from "graphql-tag";

export default gql`
  type Community {
    _id: ID
    name: String
    description: String
    createdAt: Date
    isPrivate: Boolean
    website: String
    profilePhoto: String
    coverPhoto: String
    memberCount: Int
  }

  type Query {
    community(id: ID!): Community
  }
`;
