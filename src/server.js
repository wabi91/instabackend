import dotenv from 'dotenv';
import { ApolloServer } from 'apollo-server';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';

import schema from './schema';

dotenv.config();

const server = new ApolloServer({
  schema,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

const POST = process.env.PORT;

server.listen(POST).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
