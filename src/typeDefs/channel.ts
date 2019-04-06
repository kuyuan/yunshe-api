import gql from "graphql-tag";

export default gql`
  type Channel {
    id: ID
    communityId: String
    createdAt: Date
    name: String
    description: String
    isPrivate: Boolean
    isDefault: Boolean
    memberCount: Int
  }

  type Query {
    channel(id: ID!): Channel
  }

  input CreateChannelInput {
    communityId: ID!
    name: String!
    description: String
    isPrivate: Boolean!
  }

  type Mutation {
    createChannel(input: CreateChannelInput!): Channel
  }
`;
