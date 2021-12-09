import client from '../../client';
import { protectedResolver } from '../users.utils';
import { Resolvers } from '../../types';

const resolvers: Resolvers = {
  Mutation: {
    unfollowUser: protectedResolver(
      async (_, { username }, { loggedInUser }) => {
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
                disconnect: {
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
            error: `Unfollowing is failed`,
          };
        }
      }
    ),
  },
};

export default resolvers;
