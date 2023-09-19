const auth = require('@gql/decorators/auth');
const DocumentModel = require('@models/document.model');
const LinkModel = require('@models/link.model');
const PermissionModel = require('@models/permission.model');

const queries = {
  getGlobalLinks: auth(async (_, { docId }, { user }) => {
    const isOwner = await PermissionModel.exists({
      entityId: user._id,
      resource: docId,
      'permissions.owner': true,
    });
    if (!isOwner) throw new Error("You don't have the permission");
    return LinkModel.find({ createdBy: user._id, docId }).lean();
  }),
  getDocumentFromLink: async (_, { uid }) => {
    const link = await LinkModel.findOne({ uid }).lean();
    if (!link) throw new Error('Invalid Link!');
    if (link.dueDate && link.dueDate < new Date()) throw new Error('Link expired!');

    return DocumentModel.findOne({ _id: link.docId }).lean();
  },
};

const mutations = {
  createGlobalLink: auth(async (_, { docId, dueDate = null }, { user }) => {
    console.log(dueDate);
    if (dueDate && dueDate < new Date()) {
      throw new Error('Due date cannot be < current date!');
    }
    const isOwner = await PermissionModel.exists({
      entityId: user._id,
      resource: docId,
      'permissions.owner': true,
    });
    if (!isOwner) throw new Error("You don't have the permission");

    const count = await LinkModel.countDocuments({ createdBy: user._id, docId });

    if (count >= 5) throw new Error('You already have 5 active links for this document!');

    await LinkModel.create({ docId, createdBy: user._id, dueDate });
    return true;
  }),
  deleteGlobalLink: auth(async (_, { linkId }, { user }) => {
    const deleteRes = await LinkModel.deleteOne({ _id: linkId, createdBy: user._id });
    if (!deleteRes.deletedCount) throw new Error('Unable to delete!');
    return true;
  }),
};

module.exports = { queries, mutations };
