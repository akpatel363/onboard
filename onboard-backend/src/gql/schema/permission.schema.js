const { gql } = require('apollo-server-core');

const schema = gql`
  type PermissionEntity {
    name: String
    type: User
  }
  type Permission {
    _id: ID!
    entityName: String
    entityType: String
    permissions: JSON
  }
  type DocPermission {
    write: Boolean
    read: Boolean
    owner: Boolean
    meta: JSON
  }
`;

const queries = gql`
  extend type Query {
    getPermittedUsers(docId: ID!): [Permission]
  }
`;

const mutations = gql`
  extend type Mutation {
    revokePermission(permissionId: ID!): Boolean
  }
`;

module.exports = { schema, queries, mutations };
