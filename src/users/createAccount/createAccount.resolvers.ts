import bcrypt from 'bcrypt';

import client from '../../client';
import { Resolvers } from '../../types';

const resolvers: Resolvers = {
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
      if (existingUser) {
        return {
          ok: false,
          error: 'Duplicated user who has same username or email is existed',
        };
      }
      const hashPwd = await bcrypt.hash(password, 10);
      const user = await client.user.create({
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

      return {
        ok: true,
        user,
      };
    },
  },
};

export default resolvers;
