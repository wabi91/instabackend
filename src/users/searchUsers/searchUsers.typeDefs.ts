import { gql } from 'apollo-server-core';

export default gql`
  type SearchUsersResult {
    ok: Boolean!
    error: String
    users: [User]
    totalPage: Int
  }
  type Query {
    searchUsers(keyword: String!, page: Int): SearchUsersResult!
  }
`;
