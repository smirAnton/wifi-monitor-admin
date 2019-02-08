import BaseService from '../base';

import {
  pagination,
  filter,
  parser,
  sort
} from '../../utils';

export default class BaseDictionaryService extends BaseService {
  constructor(model, projection, csvColumns) {
    super(model, projection);
    this.csvColumns = csvColumns;
  }

  fetchAll = async query => {
    try {
      const filterValue = this.getFilterValue(this.model);
      const filterObj = filter({ ...query, ...filterValue }, 'search');
      const sortObj = sort(query);
      const limit = pagination.limit(query);
      const skip = pagination.skip(query);

      const items = await this.model
        .find(filterObj, this.projection)
        .sort(sortObj)
        .skip(skip)
        .limit(limit)
        .lean()
        .exec();

      const count = await this.model
        .find(filterObj)
        .count();

      if (items[0]) {
        items[0].count = count;
      }

      return items;
    } catch (ex) {
      throw ex;
    }
  };

  fetch4export = async() => {
    try {
      const arr = await this.model.find();
      const csv = await parser.json2csv(arr, this.csvColumns);
      return csv;
    } catch (ex) {
      throw ex;
    }
  };

  getFilterValue = model => {
    switch (model.modelName) {
      case 'dnsDictionary':
        return { isDns: true };

      case 'ndpiDictionary':
        return { isNdpi: true };

      case 'superDictionary':
        return { isSuper: true };

      case 'category':
        return { isCategory: true };

      default:
        return {};
    }
  };
}
