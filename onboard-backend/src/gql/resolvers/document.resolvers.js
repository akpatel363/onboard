const auth = require('@gql/decorators/auth');
const DocumentModel = require('@models/document.model');
const LinkModel = require('@models/link.model');
const PermissionModel = require('@models/permission.model');
const { isValidObjectId, Types } = require('mongoose');

const fieldResolvers = {
  Document: {
    permission: async (parent, _, { user }) => {
      if (parent?.permission) return parent.permission;
      const permission = await PermissionModel.findOne({
        resource: parent._id,
        entityId: user._id,
      }).lean();
      if (!permission) return null;
      return { ...permission.permissions, meta: permission.meta };
    },
  },
};

const queries = {
  getDocuments: auth(async (_, { page = 1 }, { user }) => {
    if (page <= 0) throw new Error('Page cannot be -ve or zero.');

    const permissions = await PermissionModel.find({ entityId: user._id })
      .sort('-updatedAt')
      .skip((page - 1) * 24)
      .limit(24)
      .populate('resource')
      .lean();

    return {
      documents: permissions.map(({ resource, ...permission }) => ({
        ...resource,
        permission: { ...permission.permissions, meta: permission.meta },
      })),
      canFetchMore: permissions?.length === 24,
      nextPage: page + 1,
    };
  }),
  getDocument: auth(async (_, { _id }, { user }) => {
    if (!isValidObjectId(_id)) throw new Error('Please provide a valid id');
    const permission = await PermissionModel.findOne({ resource: _id, entityId: user._id }).lean();
    if (!permission?.permissions?.read) throw new Error("You don't have the permission!");
    const doc = await DocumentModel.findOne({ _id }).lean();
    return { ...doc, permission: { ...permission.permissions, meta: permission.meta } };
  }),
};

const mutations = {
  createDocument: auth(async (_, __, { user }) => {
    const doc = await DocumentModel.create({
      meta: { createdBy: { username: user.username, name: user.name } },
    });
    if (!doc._id) throw new Error('Unable to create new Document!');
    await PermissionModel.create({
      resource: doc._id,
      entityId: user._id,
      entityType: 'USER',
      permissions: { write: true, read: true, owner: true },
    });
    return doc;
  }),
  saveDoc: auth(async (_, { payload }, { user }) => {
    const { docId } = payload;
    let { blocks } = payload;

    const permission = await PermissionModel.findOne({
      resource: docId,
      entityId: user._id,
    }).lean();

    if (!permission?.permissions?.write) throw new Error("You don't have permission!");

    blocks = blocks.map(({ c = '', t, ...rest }) => ({
      type: t,
      ...(c && { content: c }),
      ...rest,
      _id: new Types.ObjectId(),
    }));
    await DocumentModel.updateOne(
      { _id: docId, owner: user._id },
      { $set: { blocks, 'meta.updatedBy': { username: user.username, name: user.name } } },
    );
    return true;
  }),
  updateTitle: auth(async (_, { _id, title }, { user }) => {
    const permission = await PermissionModel.findOne({
      resource: _id,
      entityId: user._id,
    }).lean();

    if (!permission?.permissions?.write) throw new Error("You don't have permission!");

    await DocumentModel.updateOne(
      { _id, owner: user._id },
      { $set: { title, 'meta.updatedBy': { username: user.username, name: user.name } } },
    );
    return true;
  }),
  deleteDoc: auth(async (_, { _id }, { user }) => {
    const permission = await PermissionModel.findOne({
      resource: _id,
      entityId: user._id,
    }).lean();

    if (!permission?.permissions?.owner) throw new Error("You don't have permission!");

    await LinkModel.deleteMany({ docId: _id });

    await PermissionModel.deleteMany({ resource: _id });

    await DocumentModel.deleteOne({ _id });

    return true;
  }),
  shareDoc: auth(async (_, { docId, userIds, read, write }, { user }) => {
    if (!userIds?.length) throw new Error('No users selected!');

    const permission = await PermissionModel.findOne({
      resource: docId,
      entityId: user._id,
    }).lean();

    if (!permission?.permissions?.owner) throw new Error("You don't have permission!");

    const promises = userIds.map(async (each) => {
      await PermissionModel.updateOne(
        { resource: docId, entityId: each },
        {
          $set: {
            entityType: 'USER',
            permissions: { read: read || write, write },
            'meta.sharedBy': { username: user.username },
          },
        },
        { upsert: true },
      );
    });

    await Promise.all(promises);

    return true;
  }),
};

module.exports = { fieldResolvers, queries, mutations };
