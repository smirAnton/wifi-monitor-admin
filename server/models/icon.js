import mongoose, { Schema } from 'mongoose';
import uuid from 'node-uuid';

import { ICON_LIST } from '../constants/icons';

import { createLogger } from '../utils';

const logger = createLogger(module);

const IconSchema = new Schema({
  _id      : { type: String, default: uuid.v4 },

  icon     : { type: String, required: true, unique: true },
  name     : { type: String, required: true, unique: true },

  keywords : [{
    _id: { type: String, default: uuid.v4 },
    key: { type: String, default: '' }
  }],

  createdAt: { type: Date, default: new Date() },
  updatedAt: { type: Date, default: new Date() }
});

const Icon = mongoose.model('icons', IconSchema);

Icon
  .find()
  .lean()
  .exec()
  .then(data => {
    if (!data.length) {
      Promise.all(ICON_LIST.map(({ icon, name }) =>
        Icon.create({
          _id: uuid.v4(),
          icon,
          name,
          keywords: [],
          createdAt: new Date(),
          updatedAt:  new Date()
        })
      ))
      .then(() => logger.info('Created'))
      .catch(logger.error);
    }
  });

export default Icon;
