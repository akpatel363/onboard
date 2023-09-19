const { GraphQLJSON } = require('graphql-type-json');
const DateScalar = require('@gql/scalars/date.scalar');
const User = require('./user.resolvers');
const Document = require('./document.resolvers');
const Permission = require('./permission.resolvers');
const Link = require('./link.resolvers');

module.exports = {
  Date: DateScalar,
  JSON: GraphQLJSON,
  ...Document.fieldResolvers,
  ...Permission.fieldResolvers,
  Query: {
    ...User.queries,
    ...Document.queries,
    ...Permission.queries,
    ...Link.queries,
  },
  Mutation: {
    ...User.mutations,
    ...Document.mutations,
    ...Permission.mutations,
    ...Link.mutations,
  },
};
