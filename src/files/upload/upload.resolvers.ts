/* eslint-disable @typescript-eslint/no-unused-vars */
import { GraphQLUpload } from 'graphql-upload';
import { finished } from 'stream/promises';
import { createWriteStream } from 'fs';
import { Resolvers } from '../../types';

const resolvers: Resolvers = {
  // This maps the `Upload` scalar to the implementation provided
  // by the `graphql-upload` package.
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  Upload: GraphQLUpload,

  Mutation: {
    singleUpload: async (_, { file }) => {
      const { createReadStream, filename, mimetype, encoding } = await file;

      // Invoking the `createReadStream` will return a Readable Stream.
      // See https://nodejs.org/api/stream.html#stream_readable_streams
      const stream = createReadStream();

      // This is purely for demonstration purposes and will overwrite the
      // local-file-output.txt in the current working directory on EACH upload.
      // const out = createWriteStream('local-file-output.txt');
      // stream.pipe(out);
      // await finished(out);

      // return { filename, mimetype, encoding };

      // Promisify the stream and store the file, then…
      return true;
    },
  },
};

export default resolvers;
