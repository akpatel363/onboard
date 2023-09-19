const { gql } = require('apollo-server-core');

const schema = gql`
  type Document {
    _id: ID
    title: String!
    owner: User
    blocks: [JSON]
    createdAt: Date
    updatedAt: Date
    permission: DocPermission
    meta: JSON
  }
`;

const queries = gql`
  type DocumentsOutput {
    documents: [Document]
    canFetchMore: Boolean
    nextPage: Int
  }
  extend type Query {
    getDocuments(page: Int): DocumentsOutput
    getDocument(_id: ID!): Document
  }
`;

const mutations = gql`
  input SaveDocInput {
    docId: ID!
    blocks: JSON!
  }
  extend type Mutation {
    createDocument: Document
    saveDoc(payload: SaveDocInput!): Boolean
    updateTitle(_id: ID!, title: String!): Boolean
    deleteDoc(_id: ID!): Boolean
    shareDoc(docId: ID!, userIds: [ID!]!, read: Boolean!, write: Boolean!): Boolean
  }
`;

module.exports = { schema, queries, mutations };
