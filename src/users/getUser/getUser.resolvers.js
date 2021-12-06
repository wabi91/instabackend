import client from '../../client';

export default {
  Query: {
    getUsers: async (_, { page = 1 }) => {
      const users = await client.user.findMany({
        include: {
          following: {
            take: 5,
          },
          followers: {
            take: 5,
          },
        },
        take: 5,
        skip: (page - 1) * 5,
      });

      const total = await client.user.count();

      return {
        ok: true,
        users,
        totalPage: Math.ceil(total / 5),
      };
    },
    getUser: (_, args) => {
      const where = Object.keys(args).reduce((acc, key) => {
        const val = args[key];
        if (!val) return acc;
        return { ...acc, [key]: val };
      }, {});

      return client.user.findFirst({
        where,
        include: {
          following: true,
          followers: true,
        },
      });
    },
  },
};
