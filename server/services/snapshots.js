import moment from 'moment';

import BaseService from './base';

import {
  SuperDictionaryService,
  NdpiDictionaryService,
  DnsDictionaryService,
  CategoryService
} from './';

import {
  SuperDictionaryModel,
  NdpiDictionaryModel,
  DnsDictionaryModel,
  SnapshotsModel,
  CategoryModel
} from '../models';

import { pagination, filter } from '../utils';

import { SNAPSHOTS_PROJECTION } from '../constants';

const DEFAULT_LIMIT = 1000000; // 1000000 items

class SnapshotService extends BaseService {
  constructor() {
    super(SnapshotsModel, SNAPSHOTS_PROJECTION);
  }

  fetchAll = async query => {
    const limit = pagination.limit(query);
    const skip = pagination.skip(query);
    const filterObj = filter(query, 'version', '_id');

    const count = await this.model.count();

    const snapshots = await SnapshotsModel
      .find(filterObj, this.projection)
      .skip(skip)
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean()
      .exec();

    if (snapshots[0]) {
      snapshots[0].count = count;
    }

    return snapshots;
  }

  create = async (query = {}) => {
    const snapshots = await this.fetchAll({ limit: 0 });

    let version = `${moment().format('MMDDYYYY')}-1`;

    if (snapshots.length > 0) {
      const arrVersion = snapshots[0].version.split('-');

      if (arrVersion[0] === moment().format('MMDDYYYY')) {
        version = `${moment().format('MMDDYYYY')}-${Number(arrVersion[1]) + 1}`;
      }
    }

    const [categorySnapshot, dnsSnapshot, ndpiSnapshot, superSnapshot] = await Promise.all([
      CategoryService.fetchAll({ limit: DEFAULT_LIMIT }),
      DnsDictionaryService.fetchAll({ limit: DEFAULT_LIMIT }),
      NdpiDictionaryService.fetchAll({ limit: DEFAULT_LIMIT }),
      SuperDictionaryService.fetchAll({ limit: DEFAULT_LIMIT })
    ]);

    // remove count
    if (categorySnapshot.length) {
      delete categorySnapshot[0].count;
    }
    if (dnsSnapshot.length) {
      delete dnsSnapshot[0].count;
    }
    if (ndpiSnapshot.length) {
      delete ndpiSnapshot[0].count;
    }
    if (superSnapshot.length) {
      delete superSnapshot[0].count;
    }

    const item = {
      ...query,
      categorySnapshot,
      dnsSnapshot,
      ndpiSnapshot,
      superSnapshot: {
        ...superSnapshot,
        differenceTimeConstrain: JSON.stringify(superSnapshot.differenceTimeConstrain)
      },
      createdAt: new Date(),
      version
    };

    const model = await this.model.create(item);
    return model;
  }

  restoreDictionariesVersion = async id => {
    const snapshot = await this.fetchById(id);

    const columnNames = ['categorySnapshot', 'dnsSnapshot', 'ndpiSnapshot', 'superSnapshot'];

    await Promise.all([
      CategoryService.removeAll(),
      DnsDictionaryService.removeAll(),
      NdpiDictionaryService.removeAll(),
      SuperDictionaryService.removeAll()
    ]);

    const promises = columnNames.map(column => {
      const columnParsedData = snapshot[column];

      switch (column) {
        case 'categorySnapshot':
          return CategoryModel.insertMany(columnParsedData);

        case 'dnsSnapshot':
          return DnsDictionaryModel.insertMany(columnParsedData);

        case 'ndpiSnapshot':
          return NdpiDictionaryModel.insertMany(columnParsedData);

        case 'superSnapshot':
          return SuperDictionaryModel.insertMany(columnParsedData);

        default:
          return false;
      }
    });

    return Promise.all(promises);
  }
}

export default new SnapshotService();
