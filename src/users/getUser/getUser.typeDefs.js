import { gql } from 'apollo-server-express';

export default gql`
  type Query {
    getUsers: [User]
    getUser(id: Int, username: String, email: String): User
  }
`;
