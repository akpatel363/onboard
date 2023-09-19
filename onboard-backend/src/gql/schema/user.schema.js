const { gql } = require('apollo-server-express');

const schema = gql`
  type User {
    _id: ID
    email: String
    username: String
    name: String
  }
`;

const queries = gql`
  extend type Query {
    getUsers: [User]
    suggestUsers(input: String!): [User]
  }
`;

const mutations = gql`
  type UserWithToken {
    _id: String
    email: String!
    username: String!
    name: String
    token: String!
  }

  input LoginInput {
    username: String!
    password: String!
  }

  input RegisterInput {
    username: String!
    password: String!
    email: String!
    name: String
  }

  input UpdateProfileInput {
    name: String
    email: String
  }

  input ChangePasswordInput {
    newPassword: String!
    oldPassword: String!
  }

  extend type Mutation {
    login(payload: LoginInput!): UserWithToken
    register(payload: RegisterInput!): UserWithToken
    updateProfile(payload: UpdateProfileInput!): User
    changePassword(payload: ChangePasswordInput!): Boolean
  }
`;

module.exports = { schema, queries, mutations };
