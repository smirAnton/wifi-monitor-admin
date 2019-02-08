import mongoose, { Schema } from 'mongoose';
import uuid from 'node-uuid';

import { _1MB, _10MB } from '../../constants';

const CategorySchema = new Schema({
  _id                     : { type: String, default: uuid.v4 },
  name                    : { type: String, required: true, unique: true },
  bandwidthConstrain      : { type: Number },
  sentBytesConstrain      : { type: Number },
  receivedBytesConstrain  : { type: Number },
  upArrowPercent          : { type: Number, default: 50 },
  downArrowPercent        : { type: Number, default: 50 },
  sentLightThreshold      : { type: Number, default: _1MB },
  sentBoldThreshold       : { type: Number, default: _10MB },
  receivedLightThreshold  : { type: Number, default: _1MB },
  receivedBoldThreshold   : { type: Number, default: _10MB },

  createdAt               : { type: Date, default: new Date() },
  updatedAt               : { type: Date, default: new Date() },
  registerAt              : { type: Date, default: new Date() }
});

const Category = mongoose.model('category', CategorySchema);

export default Category;
