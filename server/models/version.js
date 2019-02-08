import mongoose, { Schema } from 'mongoose';
import uuid from 'node-uuid';

const VersionSchema = new Schema({
  _id      : { type: String, default: uuid.v4 },
  version  : { type: String, required: true, unique: true },

  features : [{
    _id    : { type: String, default: uuid.v4 },
    title  : { type: String, default: '' }
  }],

  updatedAt: { type: Date, default: new Date() },
  createdAt: { type: Date, default: new Date() }
});

const Version = mongoose.model('version', VersionSchema);

export default Version;
