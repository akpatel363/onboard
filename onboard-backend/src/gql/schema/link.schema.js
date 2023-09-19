const { gql } = require('apollo-server-core');

const schema = gql`
  type Link {
    _id: ID!
    uid: String!
    dueDate: Date
  }
`;

const queries = gql`
  extend type Query {
    getGlobalLinks(docId: ID!): [Link]
    getDocumentFromLink(uid: ID!): Document
  }
`;

const mutations = gql`
  extend type Mutation {
    createGlobalLink(docId: ID!, dueDate: Date): Boolean
    deleteGlobalLink(linkId: ID!): Boolean
  }
`;

module.exports = { schema, queries, mutations };
