const { gql } = require('apollo-server-express');
const User = require('./user.schema');
const Document = require('./document.schema');
const Permission = require('./permission.schema');
const Link = require('./link.schema');

module.exports = gql`
  scalar Date
  scalar JSON

  ${User.schema}
  ${Permission.schema}
  ${Document.schema}
  ${Link.schema}

  type Query

  ${User.queries}
  ${Permission.queries}
  ${Document.queries}
  ${Link.queries}

  type Mutation

  ${User.mutations}
  ${Permission.mutations}
  ${Document.mutations}
  ${Link.mutations}
`;
