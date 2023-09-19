const collectionNames = require('@constants/collectionNames');
const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      default: 'Untitled',
    },
    blocks: [],
    meta: {},
  },
  { versionKey: false, timestamps: true },
);

const DocumentModel = mongoose.model(collectionNames.DOCUMENT, documentSchema);

module.exports = DocumentModel;
