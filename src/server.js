import dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import logger from 'morgan';
import { ApolloServer } from 'apollo-server-express';
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageGraphQLPlayground,
} from 'apollo-server-core';
import { graphqlUploadExpress } from 'graphql-upload';

import { typeDefs, resolvers } from './schema';
import { getUser } from './users/users.utils';

dotenv.config();

const POST = process.env.PORT;

(async function startServer() {
  const app = express();
  app.use(logger('tiny'));
  app.use(graphqlUploadExpress());
  // this will be removed
  app.use('/static', express.static('uploads'));

  const httpServer = http.createServer(app);

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageGraphQLPlayground(),
    ],
    context: async ({ req }) => {
      return {
        loggedInUser: await getUser(req.headers.authorization),
      };
    },
  });

  await apolloServer.start();
  // This middleware should be added before calling `applyMiddleware`.

  apolloServer.applyMiddleware({
    app,
    /**
     * By default, apollo-server hosts its GraphQL endpoint at the server root.
     * However, *other* Apollo Server packages host it at graphql.
     * Optionally provide this to match apollo-server.
     */
    // path: '/',
  });
  await new Promise((resolve) => httpServer.listen({ port: POST }, resolve));

  console.log(
    `🚀 Server ready at http://localhost:${POST}${apolloServer.graphqlPath}`
  );
})();
