import mongoose, { Schema } from 'mongoose';
import uuid from 'node-uuid';

const SuperDictionarySchema = new Schema({
  _id                 : { type: String, default: uuid.v4 },

  keyword             : { type: String },
  ndpi                : { type: String },
  isAnd               : { type: Boolean, default: true },

  superService        : { type: String, default: '' },
  superCategory       : { type: String, default: '' },
  superSubcategory    : { type: String, default: '' },

  differenceTimeConstrain : {
    min               : [{ type: Number }],
    max               : [{ type: Number }],
    equal             : [{ type: Number }]
  },
  sentBytesConstrain  : {
    min               : [{ type: Number }],
    max               : [{ type: Number }],
    equal             : [{ type: Number }]
  },
  receivedBytesConstrain  : {
    min               : [{ type: Number }],
    max               : [{ type: Number }],
    equal             : [{ type: Number }]
  },
  startTimeConstrain  : {
    min               : [{ type: Date }],
    max               : [{ type: Date }],
    equal             : [{ type: Date }]
  },
  endTimeConstrain  : {
    min               : [{ type: Date }],
    max               : [{ type: Date }],
    equal             : [{ type: Date }]
  },
  dnsResponseIPConstrain  : {
    equal             : [{ type: String, default: '' }],
    contain           : [{ type: String, default: '' }],
    startsWith        : [{ type: String, default: '' }],
    endsWith          : [{ type: String, default: '' }],
    isNot             : [{ type: String, default: '' }],
    exclude           : [{ type: String, default: '' }]
  },
  dnsResponseNameConstrain  : {
    equal             : [{ type: String, default: '' }],
    contain           : [{ type: String, default: '' }],
    startsWith        : [{ type: String, default: '' }],
    endsWith          : [{ type: String, default: '' }],
    isNot             : [{ type: String, default: '' }],
    exclude           : [{ type: String, default: '' }]
  },
  deviceHostnameConstrain : {
    equal             : [{ type: String, default: '' }],
    contain           : [{ type: String, default: '' }],
    startsWith        : [{ type: String, default: '' }],
    endsWith          : [{ type: String, default: '' }],
    isNot             : [{ type: String, default: '' }],
    exclude           : [{ type: String, default: '' }]
  },
  dnsRequestConstrain : {
    equal             : [{ type: String, default: '' }],
    contain           : [{ type: String, default: '' }],
    startsWith        : [{ type: String, default: '' }],
    endsWith          : [{ type: String, default: '' }],
    isNot             : [{ type: String, default: '' }],
    exclude           : [{ type: String, default: '' }]
  },
  ndpiConstrain : {
    equal             : [{ type: String, default: '' }],
    contain           : [{ type: String, default: '' }],
    startsWith        : [{ type: String, default: '' }],
    endsWith          : [{ type: String, default: '' }],
    isNot             : [{ type: String, default: '' }],
    exclude           : [{ type: String, default: '' }]
  },
  portsConstrain : {
    equal             : [{ type: Number }],
    contain           : [{ type: Number }],
    startsWith        : [{ type: Number }],
    endsWith          : [{ type: Number }],
    isNot             : [{ type: Number }],
    exclude           : [{ type: Number }]
  },
  dnsRequestsConstrain : {
    equal             : [{ type: String, default: '' }],
    contain           : [{ type: String, default: '' }],
    startsWith        : [{ type: String, default: '' }],
    endsWith          : [{ type: String, default: '' }],
    isNot             : [{ type: String, default: '' }],
    exclude           : [{ type: String, default: '' }]
  },
  dnsResponseIPsConstrain : {
    equal             : [{ type: String, default: '' }],
    contain           : [{ type: String, default: '' }],
    startsWith        : [{ type: String, default: '' }],
    endsWith          : [{ type: String, default: '' }],
    isNot             : [{ type: String, default: '' }],
    exclude           : [{ type: String, default: '' }]
  },
  dnsResponseNamesConstrain : {
    equal             : [{ type: String, default: '' }],
    contain           : [{ type: String, default: '' }],
    startsWith        : [{ type: String, default: '' }],
    endsWith          : [{ type: String, default: '' }],
    isNot             : [{ type: String, default: '' }],
    exclude           : [{ type: String, default: '' }]
  },
  densityConstrain  : {
    min               : [{ type: Number }],
    max               : [{ type: Number }],
    equal             : [{ type: Number }]
  },
  bandwidthConstrain  : {
    min               : [{ type: Number }],
    max               : [{ type: Number }],
    equal             : [{ type: Number }]
  },
  bandwidthRatioConstrain  : {
    min               : [{ type: Number }],
    max               : [{ type: Number }],
    equal             : [{ type: Number }]
  },

  createdAt           : { type: Date, default: new Date() },
  updatedAt           : { type: Date, default: new Date() },
  registerAt          : { type: Date, default: new Date() }
});

SuperDictionarySchema.index({
  keyword: 'text',
  ndpi: 'text',
  superService: 'text',
  superCategory: 'text',
  superSubcategory: 'text'
});

const SuperDictionary = mongoose.model('superDictionary', SuperDictionarySchema);

export default SuperDictionary;
