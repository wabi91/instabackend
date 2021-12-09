import client from '../../client';
import { Resolvers } from '../../types';

const resolvers: Resolvers = {
  Query: {
    getFollowing: async (_, { username, lastId }) => {
      const ok = await client.user.findUnique({
        where: { username },
        select: { id: true },
      });
      if (!ok) {
        return {
          ok: false,
          error: 'User not found',
        };
      }

      const following = await client.user
        .findUnique({
          where: { username },
        })
        .following({
          take: 5,
          skip: lastId ? 1 : 0,
          ...(lastId && { cursor: { id: lastId } }),
        });

      const count = await client.user.count({
        where: {
          followers: {
            some: {
              username,
            },
          },
        },
      });

      return {
        count,
        following,
        ok: true,
      };
    },
  },
};

export default resolvers;
