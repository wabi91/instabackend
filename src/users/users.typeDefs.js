import { gql } from 'apollo-server-express';

export default gql`
  type User{
    id: String!
    username: String!
    email: String!
    name: String!
    location: String!
    avatarURL: String!
    githubUsername: String!
    createdAt: String!
    updatedAt: String!
  }
  type Mutation {
    createAccount(
      username: String!
      email: String!
      name: String!
      location: String!
      avatarURL: String!
      githubUsername: String!
      password: String!
    ): User
  }
  type Query {
    getUsers: [User]
    getProfile(username: String!): User
  }
`;
