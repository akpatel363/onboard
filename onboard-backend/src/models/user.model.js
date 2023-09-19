const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const collectionNames = require('@constants/collectionNames');

const { SECRET } = process.env;

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: [true, 'Username is required'],
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'E-Mail is required'],
      validate: {
        validator: (value) => /[\w.]+@[\w.]+\w{2,}$/.test(value),
        message: 'Invalid email address',
      },
    },
    name: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false },
);

userSchema.statics.verifyCredentials = async function verifyCredentials({ username, password }) {
  const user = await this.findOne({ username }).lean();
  if (!user) throw new Error('Invalid Credentials');
  const comparisonResult = await bcrypt.compare(password, user.password);
  if (!comparisonResult) throw new Error('Invalid Credentials');
  const token = jwt.sign({ _id: user._id }, SECRET);
  return { ...user, token };
};

userSchema.statics.verifyPassword = async function verifyPassword({ _id, password }) {
  const user = await this.findById(_id).lean();
  if (!user) throw new Error('Invalid request');
  const comparisonResult = await bcrypt.compare(password, user.password);
  if (!comparisonResult) throw new Error('Wrong password.');
  return true;
};

userSchema.pre('save', async function encodePassword(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

const UserModel = mongoose.model(collectionNames.USER, userSchema);

module.exports = UserModel;
