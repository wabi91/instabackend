import { gql } from 'apollo-server-express';

export default gql`
  type CreateAccountResult {
    ok: Boolean!
    error: String
    user: User
  }
  type Mutation {
    createAccount(
      username: String!
      email: String!
      name: String!
      location: String!
      avatar: String
      githubUsername: String!
      password: String!
    ): CreateAccountResult!
  }
`;
