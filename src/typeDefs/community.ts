import gql from "graphql-tag";

export default gql`
  type Community {
    id: ID
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

  input CreateCommunityInput {
    name: String!
    description: String!
    website: String
    profileFile: Upload
    coverFile: Upload
    isPrivate: Boolean!
  }

  input UpdateCommunityInput {
    description: String
    website: String
    profileFile: Upload
    coverFile: Upload
    isPrivate: Boolean
  }

  type Mutation {
    createCommunity(input: CreateCommunityInput!): Community
    updateCommunity(input: UpdateCommunityInput!): Community
  }
`;
