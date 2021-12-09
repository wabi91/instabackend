import { gql } from 'apollo-server-express';

export default gql`
  type GetUsersResult {
    ok: Boolean!
    error: String
    users: [User]
    totalPage: Int
  }
  type Query {
    getUsers(page: Int): GetUsersResult!
    getUser(id: Int, username: String, email: String): User
  }
`;
