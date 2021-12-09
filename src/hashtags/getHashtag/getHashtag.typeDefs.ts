import { gql } from 'apollo-server-core';

export default gql`
  type Query {
    getHashtag(tag: String!): Hashtag
  }
`;
