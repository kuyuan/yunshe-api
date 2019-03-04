import gql from "graphql-tag";

export default gql`
  type User {
    _id: ID
    name: String
  }

  type Query {
    user(id: ID!): User!
  }
`;
