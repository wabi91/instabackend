import bcrypt from 'bcrypt';
import jwt, { Secret } from 'jsonwebtoken';

import client from '../../client';
import { Resolvers } from '../../types';

const resolvers: Resolvers = {
  Mutation: {
    login: async (_, { username, password }) => {
      const user = await client.user.findFirst({ where: { username } });
      if (!user) {
        return {
          ok: false,
          error: 'User not found',
        };
      }

      const isValidPwd = await bcrypt.compare(password, user.password);

      if (!isValidPwd) {
        return {
          ok: false,
          error: 'Incorrect password',
        };
      }

      const token = jwt.sign(
        {
          id: user.id,
        },
        process.env.SECRET_KEY as Secret,
        {
          expiresIn: '2h',
        }
      );

      return {
        ok: true,
        token,
      };
    },
  },
};

export default resolvers;
