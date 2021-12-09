import client from '../../client';
import { Resolvers } from '../../types';

const resolvers: Resolvers = {
  Query: {
    getPhoto: (_, { id }) =>
      client.photo.findUnique({
        where: {
          id,
        },
      }),
  },
};

export default resolvers;
