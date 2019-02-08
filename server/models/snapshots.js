import mongoose, { Schema } from 'mongoose';
import uuid from 'node-uuid';

const SnapshotsSchema = new Schema({
  _id             : { type: String, default: uuid.v4 },

  version         : { type: String, required: true, unique: true },
  isActive        : { type: Boolean, default: true },
  description     : { type: String, default: '' },

  categorySnapshot: { type: Array, default: [] },
  dnsSnapshot     : { type: Array, default: [] },
  ndpiSnapshot    : { type: Array, default: [] },
  superSnapshot   : { type: Array, default: [] },

  updatedAt       : { type: Date, default: new Date() },
  createdAt       : { type: Date, default: new Date() }
});

const Snapshots = mongoose.model('snapshots', SnapshotsSchema);

export default Snapshots;
