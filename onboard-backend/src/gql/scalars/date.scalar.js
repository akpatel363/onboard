const { GraphQLScalarType, Kind } = require('graphql');

const Date = new GraphQLScalarType({
  name: 'Date',
  description: 'Represents Date',
  serialize: (value) => new Date(value).toISOString(),
  parseValue: (value) => new Date(value),
  parseLiteral: (value) => (value.kind === Kind.STRING && new Date(value)) || null,
});
