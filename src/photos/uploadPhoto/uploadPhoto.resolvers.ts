import client from '../../client';
import { Resolvers } from '../../types';
import { protectedResolver } from '../../users/users.utils';
import { processHashtags } from '../photos.utils';

const resolvers: Resolvers = {
  Mutation: {
    uploadPhoto: protectedResolver(
      async (_, { file, caption }, { loggedInUser }) => {
        const connectOrCreate = processHashtags(caption);

        return client.photo.create({
          data: {
            file,
            caption,
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
            hashtags: {
              connectOrCreate,
            },
          },
        });
      }
    ),
  },
};

export default resolvers;
