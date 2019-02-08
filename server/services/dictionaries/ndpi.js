import BaseService from './base';

import { NdpiDictionaryModel } from '../../models';

import { CSV_NDPI_COLUMNS, NDPI_DICTIONARY_PROJECTION } from '../../constants';

class NdpiService extends BaseService {
  constructor() {
    super(NdpiDictionaryModel, NDPI_DICTIONARY_PROJECTION, CSV_NDPI_COLUMNS);
  }
}

const ndpiService = new NdpiService();

export default ndpiService;
