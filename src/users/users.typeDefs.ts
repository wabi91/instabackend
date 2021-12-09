import { gql } from 'apollo-server-express';

export default gql`
  type User {
    id: Int!
    username: String!
    email: String!
    name: String!
    location: String!
    bio: String
    avatar: String
    following: [User]
    followers: [User]
    totalFollowing: Int!
    totalFollowers: Int!
    isMe: Boolean!
    isFollowing: Boolean!
    githubUsername: String!
    createdAt: String!
    updatedAt: String!
  }
`;
