const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const UserModel = require('@models/user.model');
const auth = require('@gql/decorators/auth');

const { SECRET } = process.env;

const queries = {
  getUsers: auth(async () => UserModel.find({}, { password: 0 }).lean()),
  suggestUsers: auth(async (_, { input }, { user }) => {
    if (!input) return [];
    return UserModel.find(
      { username: { $regex: new RegExp(input, 'i') }, _id: { $ne: user._id } },
      { name: 0, email: 0 },
    )
      .limit(5)
      .lean();
  }),
};

const mutations = {
  login: async (_, { payload }) => UserModel.verifyCredentials(payload),
  register: async (_, { payload }) => {
    try {
      const user = new UserModel(payload);
      await user.save();
      const token = jwt.sign({ _id: user._id }, SECRET);
      return { ...user.toObject(), token };
    } catch (err) {
      if (err.code === 11000) {
        const emailExists = await UserModel.exists({ email: payload.email });
        if (emailExists) {
          throw new Error('Account associated with this E-Mail already exists.');
        }
        throw new Error('This username already exists, choose a different one');
      } else {
        throw new Error(err.message);
      }
    }
  },
  updateProfile: auth(async (_, { payload }, { user }) => {
    try {
      const updatedUser = await UserModel.findOneAndUpdate(
        { _id: user._id },
        { $set: { ...payload } },
        { new: true },
      );
      return updatedUser;
    } catch (err) {
      if (err.code === 11000) throw new Error('E-Mail not available.');
      throw new Error(err.message);
    }
  }),
  changePassword: auth(async (_, { payload: { newPassword, oldPassword } }, { user }) => {
    await UserModel.verifyPassword({ _id: user._id, password: oldPassword });
    const password = await bcrypt.hash(newPassword, 8);
    await UserModel.updateOne({ _id: user._id }, { password });
    return true;
  }),
};

module.exports = { queries, mutations };
