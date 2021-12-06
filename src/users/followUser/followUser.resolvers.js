import client from '../../client';
import { protectedResolver } from '../users.utils';

export default {
  Mutation: {
    followUser: protectedResolver(async (_, { username }, { loggedInUser }) => {
      const isExisted = await client.user.findUnique({
        where: {
          username,
        },
      });
      if (!isExisted) {
        return {
          ok: false,
          error: 'That user does not exist.',
        };
      }

      try {
        await client.user.update({
          where: { id: loggedInUser.id },
          data: {
            following: {
              connect: {
                username,
              },
            },
          },
        });

        return {
          ok: true,
        };
      } catch {
        return {
          ok: false,
          error: `Following is failed`,
        };
      }
    }),
  },
};
