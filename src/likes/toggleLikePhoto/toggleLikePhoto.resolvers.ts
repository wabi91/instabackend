import client from '../../client';
import { Resolvers } from '../../types';
import { protectedResolver } from '../../users/users.utils';

const resolvers: Resolvers = {
  Mutation: {
    toggleLikePhoto: protectedResolver(async (_, { id }, { loggedInUser }) => {
      const photo = await client.photo.findUnique({
        where: {
          id,
        },
      });
      if (!photo) {
        return {
          ok: false,
          error: 'Photo not found.',
        };
      }

      const likeWhere = {
        photoId_userId: {
          photoId: id,
          userId: loggedInUser.id,
        },
      };
      const like = await client.like.findUnique({
        where: likeWhere,
      });
      if (like) {
        await client.like.delete({
          where: likeWhere,
        });
      } else {
        await client.like.create({
          data: {
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
            photo: {
              connect: {
                id,
              },
            },
          },
        });
      }

      return {
        photo,
        ok: true,
      };
    }),
  },
};

export default resolvers;
