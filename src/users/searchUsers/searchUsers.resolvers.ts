import client from '../../client';
import { Resolvers } from '../../types';

const resolvers: Resolvers = {
  Query: {
    searchUsers: async (_, { keyword, page = 1 }) => {
      const where = {
        username: {
          contains: keyword.toLowerCase(),
        },
      };

      const users = await client.user.findMany({
        where,
        take: 5,
        skip: (page - 1) * 5,
      });

      const total = await client.user.count({ where });

      return {
        users,
        ok: true,
        totalPage: Math.ceil(total / 5),
      };
    },
  },
};

export default resolvers;
