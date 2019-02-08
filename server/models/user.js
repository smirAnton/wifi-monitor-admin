import mongoose, { Schema } from 'mongoose';
import uuid from 'node-uuid';

import { crypt } from '../utils';

const UserSchema = new Schema({
  _id       : { type: String, default: uuid.v4 },

  lName     : { type: String, default: '' },
  fName     : { type: String, default: '' },

  username  : { type: String, required: true, unique: true },
  password  : { type: String, required: true, set: crypt },

  visitedAt : { type: Date, default: new Date() },
  updatedAt : { type: Date, default: new Date() },
  registerAt: { type: Date, default: new Date() }
});

const User = mongoose.model('user', UserSchema);

export default User;
