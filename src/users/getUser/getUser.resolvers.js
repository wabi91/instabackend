import client from '../../client';

export default {
  Query: {
    getUsers: () => client.user.findMany(),
    getUser: (_, args) => {
      const where = Object.keys(args).reduce((acc, key) => {
        const val = args[key];
        if (!val) return acc;
        return { ...acc, [key]: val };
      }, {});

      return client.user.findFirst({
        where,
      });
    },
  },
};
