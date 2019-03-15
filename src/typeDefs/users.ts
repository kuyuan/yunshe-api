import gql from "graphql-tag";

export default gql`
  type User {
    _id: ID
    name: String
    description: String
    username: String
    profilePhoto: String
    coverPhoto: String
    createdAt: Date
    lastSeen: Date
  }

  type Query {
    user(id: ID!): User
    currentUser: User
  }
`;
