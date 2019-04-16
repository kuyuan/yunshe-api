import gql from "graphql-tag";

export default gql`
  type Community {
    # Basic
    id: ID
    name: String
    description: String
    createdAt: Date
    isPrivate: Boolean
    website: String
    profilePhoto: String
    coverPhoto: String
    memberCount: Int
    # Extended
    channels: [Channel]
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
    communityId: String!
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
