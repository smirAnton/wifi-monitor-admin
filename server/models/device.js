import mongoose, { Schema } from 'mongoose';
import autoIncrement from 'mongoose-auto-increment-fix';

autoIncrement.initialize(mongoose);

const DeviceSchema = new Schema({
  _id                       : { type: String },
  mac                       : { type: String, required: true },

  nickname                  : { type: String, default: '' },
  password                  : { type: String, default: '' },
  secret                    : { type: String, default: '' },

  timezone                  : { type: String, default: 'America/Vancouver' },
  comment                   : { type: String, default: '' },     // comments block on ui
  link2ui                   : { type: String, default: '' },

  version                   : { type: String, default: '' },
  version2update            : { type: String, default: '' },
  dictionariesVersion       : { type: String, default: '' },
  dictionariesVersion2update: { type: String, default: '' },

  isTunnel                  : { type: Boolean, default: false }, // is ssh tunnel setup
  isTunnelUI                : { type: Boolean, default: false }, // is ssh tunnel for UI setup

  // ports to access console by SSH tunnel
  ports         : {
    monitoring  : { type: String, default: '' },
    ssh         : { type: String, default: '' }
  },


  // ports to access UI by SSH tunnel
  portsUI      : {
    monitoring : { type: String, default: '' },
    ssh        : { type: String, default: '' }
  },

  adminEmail   : { type: String, default: '' },
  internalIP   : { type: String, default: '' },
  emails       : [{ type: String }],

  shouldUpdateDictionaries: { type: Boolean, default: false },
  shouldUseRemoteAccess   : { type: Boolean, default: false },
  shouldUpdateSettings    : { type: Boolean, default: false },
  shouldUpdateBundle      : { type: Boolean, default: false },
  shouldUpdateIcons       : { type: Boolean, default: false },
  shouldSendReport        : { type: Boolean, default: false },

  sentReportManualAt      : { type: Date, default: new Date() },
  sentReportAutoAt        : { type: Date, default: new Date() },
  createdAt               : { type: Date, default: new Date() },
  updatedAt               : { type: Date, default: new Date() }
});

// auto increment id
DeviceSchema.plugin(autoIncrement.plugin, {
  model: 'device',
  field: '_id',
  startAt: 1
});

const Device = mongoose.model('device', DeviceSchema);

export default Device;
