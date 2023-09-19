require('dotenv').config();
require('module-alias/register');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server-express');
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require('apollo-server-core/dist/plugin/landingPage/graphqlPlayground');
const { typeDefs, resolvers } = require('@gql');
const context = require('@gql/context');

(async () => {
  const { PORT, DB_URL } = process.env;

  await mongoose.connect(DB_URL);
  console.log('Connected with DB');

  const app = express();

  app.use(morgan('dev'));

  const isDevelopment = process.env.NODE_ENV === 'development';

  const apolloServer = new ApolloServer({
    context,
    typeDefs,
    resolvers,
    introspection: isDevelopment,
    plugins: isDevelopment && [new ApolloServerPluginLandingPageGraphQLPlayground()],
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app, path: '/gql' });

  app.get('/check', async (_, res) => {
    res.json({ success: true, message: 'Up & Running!' });
  });

  app.listen(PORT, () => console.log(`App running on port -> ${PORT}`));
})();
