import client from '../client';
import bcrypt from 'bcrypt';
import { UserInputError } from 'apollo-server-errors';

export default {
  Mutation: {
    createAccount: async (
      _,
      { username, email, name, location, avatarURL, githubUsername, password }
    ) => {
      const existingUser = await client.user.findFirst({
        where: {
          OR: [
            {
              username,
            },
            {
              email,
            },
          ],
        },
      });
      // hash password
      if (existingUser) {
        throw new UserInputError(
          `Duplicated user who has same username or email is existed`
        );
      }
      const hashPwd = await bcrypt.hash(password, 10);
      return client.user.create({
        data: {
          username,
          email,
          name,
          location,
          avatarURL,
          githubUsername,
          password: hashPwd,
        },
      });
      // save and return the user
    },
  },
};
