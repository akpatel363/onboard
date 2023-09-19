const jwt = require('jsonwebtoken');
const UserModel = require('@models/user.model');

const { SECRET } = process.env;

module.exports = async ({ req }) => {
  try {
    const token = req.headers.authorization;
    if (!token) return { user: null };
    const { _id } = jwt.verify(token, SECRET);
    const user = await UserModel.findById(_id, { password: 0 }).lean();
    return { user };
  } catch (err) {
    return { user: null };
  }
};
