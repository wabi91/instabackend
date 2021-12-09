import { gql } from 'apollo-server-core';

export default gql`
  type Hashtag {
    id: Int!
    tag: String!
    photos(page: Int): [Photo]
    totalPhotos: Int!
    createdAt: String!
    updatedAt: String!
  }
`;
