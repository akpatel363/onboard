const auth = require('@gql/decorators/auth');
const PermissionModel = require('@models/permission.model');

const fieldResolvers = {
  Permission: {
    entityName: (parent) => parent?.entityId?.username,
  },
};

const queries = {
  getPermittedUsers: auth(async (_, { docId }, { user }) => {
    const isOwner = await PermissionModel.exists({
      resource: docId,
      entityId: user._id,
      'permissions.owner': true,
    });
    if (!isOwner) throw new Error("You don't have the permission");
    return PermissionModel.find({ resource: docId })
      .populate({
        path: 'entityId',
        select: 'username',
      })
      .lean();
  }),
};

const mutations = {
  revokePermission: auth(async (_, { permissionId }, { user }) => {
    const deleteRes = await PermissionModel.deleteOne({
      _id: permissionId,
      'meta.sharedBy.username': user.username,
    });

    if (!deleteRes.deletedCount) throw new Error('Cannot delete!');
    return true;
  }),
};

module.exports = { queries, mutations, fieldResolvers };
