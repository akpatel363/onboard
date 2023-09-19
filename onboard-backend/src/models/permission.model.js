const mongoose = require('mongoose');
const collectionNames = require('@constants/collectionNames');

const permissionSchema = new mongoose.Schema(
  {
    resource: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'document',
    },
    entityId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'user',
    },
    entityType: {
      type: String,
      enum: ['GROUP', 'USER'],
      default: 'USER',
    },
    permissions: {},
    meta: {},
  },
  { versionKey: false, timestamps: true },
);

const PermissionModel = mongoose.model(collectionNames.PERMISSION, permissionSchema);

module.exports = PermissionModel;
