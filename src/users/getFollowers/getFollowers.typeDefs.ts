import { gql } from 'apollo-server-core';

export default gql`
  type GetFollowersResult {
    ok: Boolean!
    error: String
    followers: [User]
    count: Int
  }
  type Query {
    getFollowers(username: String!, lastId: Int): GetFollowersResult!
  }
`;
