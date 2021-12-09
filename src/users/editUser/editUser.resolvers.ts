import fs from 'fs';
import bcrypt from 'bcrypt';

import client from '../../client';
import { protectedResolver } from '../users.utils';
import { Resolvers } from '../../types';

const resolvers: Resolvers = {
  Mutation: {
    editUser: protectedResolver(
      async (
        _,
        {
          username,
          email,
          name,
          location,
          bio,
          avatarURL: uploadFile,
          githubUsername,
          password: newPassword,
        },
        { loggedInUser }
      ) => {
        let avatarURL;
        if (uploadFile) {
          const { filename, createReadStream } = await uploadFile;
          const readStream = createReadStream();
          const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`;
          const writeStream = fs.createWriteStream(
            `${process.cwd()}/uploads/${newFilename}`
          );
          readStream.pipe(writeStream);
          avatarURL = `http://localhost:${process.env.PORT}/static/${newFilename}`;
        }

        let password;
        if (newPassword) {
          password = await bcrypt.hash(newPassword, 10);
        }

        try {
          const user = await client.user.update({
            where: { id: loggedInUser.id },
            data: {
              username,
              email,
              name,
              location,
              bio,
              avatarURL,
              githubUsername,
              password,
            },
          });
          return {
            ok: true,
            user,
          };
        } catch {
          return {
            ok: false,
            error: `It's failed`,
          };
        }
      }
    ),
  },
};

export default resolvers;
