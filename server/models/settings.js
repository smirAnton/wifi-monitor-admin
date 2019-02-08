import mongoose, { Schema } from 'mongoose';
import uuid from 'node-uuid';

import { createLogger } from '../utils';

const logger = createLogger(module);

const SettingsSchema = new Schema({
  _id      : { type: String, default: uuid.v4 },

  email    : {
    dailyReport : {
      subject : { type: String, default: '' },
      header  : { type: String, default: '' },
      sender  : { type: String, default: '' }
    },
    restorePassword: {
      subject : { type: String, default: '' },
      header  : { type: String, default: '' },
      sender  : { type: String, default: '' }
    }
  },
  defaultDictionaryVersion: { type: String, default: '' },

  updatedAt: { type: Date, default: new Date() },
  createdAt: { type: Date, default: new Date() }
});

const Settings = mongoose.model('settings', SettingsSchema);

Settings
  .find()
  .lean()
  .exec()
  .then(([settings]) => {
    if (!settings) {
      Settings.create({
        email: {
          dailyReport: {
            subject: 'Daily report subject',
            header: 'Daily report header',
            sender: 'Daily report sender'
          },
          restorePassword: {
            subject: 'Restore password subject',
            header: 'Restore password header',
            sender: 'Restore password sender'
          }
        }
      });
    }
  })
  .catch(logger.error);

export default Settings;
