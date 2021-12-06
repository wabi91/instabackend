import client from '../../client';

export default {
  Query: {
    searchUsers: async (_, { keyword, page = 1 }) => {
      const users = await client.user.findMany({
        where: {
          username: {
            startsWith: keyword.toLowerCase(),
          },
        },
        take: 5,
        skip: (page - 1) * 5,
      });

      const total = await client.user.count({
        where: {
          username: {
            startsWith: keyword.toLowerCase(),
          },
        },
      });

      return {
        users,
        ok: true,
        totalPage: Math.ceil(total / 5),
      };
    },
  },
};
