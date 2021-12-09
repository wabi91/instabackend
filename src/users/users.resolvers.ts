import client from '../client';
import { Resolvers } from '../types';

const resolvers: Resolvers = {
  User: {
    totalFollowing: ({ id }) =>
      client.user.count({
        where: {
          followers: {
            some: {
              id,
            },
          },
        },
      }),
    totalFollowers: ({ id }) =>
      client.user.count({
        where: {
          following: {
            some: {
              id,
            },
          },
        },
      }),
    isMe: ({ id }, _, { loggedInUser }) =>
      !!loggedInUser && loggedInUser.id === id,
    isFollowing: async ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) return false;

      const following = await client.user.count({
        where: {
          username: loggedInUser.username,
          following: {
            some: {
              id,
            },
          },
        },
      });

      return Boolean(following);
    },
  },
};

export default resolvers;
