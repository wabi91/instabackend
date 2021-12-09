import { gql } from 'apollo-server';

export default gql`
  type GetFollowingResult {
    ok: Boolean!
    error: String
    following: [User]
    totalPages: Int
  }
  type Query {
    getFollowing(username: String!, lastId: Int): GetFollowingResult
  }
`;
