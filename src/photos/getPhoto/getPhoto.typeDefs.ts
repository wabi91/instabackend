import { gql } from 'apollo-server-core';

export default gql`
  type Query {
    getPhoto(id: Int): Photo
  }
`;
