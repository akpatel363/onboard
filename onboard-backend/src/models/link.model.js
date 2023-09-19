const crypto = require('crypto');
const collectionNames = require('@constants/collectionNames');
const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema(
  {
    uid: { type: String, required: true, unique: true },
    docId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'document',
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'user',
    },
    dueDate: {
      type: Date,
    },
  },
  { timestamps: true, versionKey: false },
);

linkSchema.pre('validate', function setUid(next) {
  this.uid = crypto.randomBytes(4).toString('hex');
  console.log(this);
  next();
});

const LinkModel = mongoose.model(collectionNames.LINK, linkSchema);

module.exports = LinkModel;
