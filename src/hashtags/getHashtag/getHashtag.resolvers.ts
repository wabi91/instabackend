import client from '../../client';
import { Resolvers } from '../../types';

const resolvers: Resolvers = {
  Query: {
    getHashtag: (_, { tag }) => client.hashtag.findUnique({ where: { tag } }),
  },
};

export default resolvers;
