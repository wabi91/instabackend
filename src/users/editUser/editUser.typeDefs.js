import { gql } from 'apollo-server-express';

export default gql`
  type EditUserResult {
    ok: Boolean!
    error: String
    user: User
  }
  type Mutation {
    editUser(
      username: String
      email: String
      name: String
      location: String
      bio: String
      avatarURL: Upload
      githubUsername: String
      password: String
    ): EditUserResult!
  }
`;
