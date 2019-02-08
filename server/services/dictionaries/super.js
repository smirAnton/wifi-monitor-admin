import BaseService from './base';

import { SuperDictionaryModel } from '../../models';

import { CSV_SUPER_COLUMNS, SUPER_DICTIONARY_PROJECTION } from '../../constants';

class SuperService extends BaseService {
  constructor() {
    super(SuperDictionaryModel, SUPER_DICTIONARY_PROJECTION, CSV_SUPER_COLUMNS);
  }
}

const superService = new SuperService();

export default superService;
