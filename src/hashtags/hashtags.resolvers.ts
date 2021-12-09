import client from '../client';
import { Resolvers } from '../types';

const resolvers: Resolvers = {
  Hashtag: {
    photos: ({ id }, { page = 1 }) =>
      client.hashtag.findUnique({ where: { id } }).photos({
        take: 5,
        skip: (page - 1) * 5,
      }),
    totalPhotos: ({ id }) =>
      client.photo.count({
        where: {
          hashtags: {
            some: {
              id,
            },
          },
        },
      }),
  },
};

export default resolvers;
