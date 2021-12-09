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
    followers: ({ id }, { page = 1 }) =>
      client.user.findUnique({ where: { id } }).followers({
        take: 5,
        skip: (page - 1) * 5,
      }),
    following: ({ id }, { page = 1 }) =>
      client.user.findUnique({ where: { id } }).following({
        take: 5,
        skip: (page - 1) * 5,
      }),
    photos: ({ id }, { page = 1 }) =>
      client.user.findUnique({ where: { id } }).photos({
        take: 5,
        skip: (page - 1) * 5,
      }),
  },
};

export default resolvers;
