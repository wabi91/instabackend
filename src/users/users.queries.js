import client from '../client';

export default {
  Query: {
    getUsers: () => client.user.findMany(),
  },
};
