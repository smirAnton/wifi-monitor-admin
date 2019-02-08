import BaseService from './base';

import { DnsDictionaryModel } from '../../models';

import { CSV_DNS_COLUMNS, DNS_DICTIONARY_PROJECTION } from '../../constants';

class DnsService extends BaseService {
  constructor() {
    super(DnsDictionaryModel, DNS_DICTIONARY_PROJECTION, CSV_DNS_COLUMNS);
  }
}

const dnsService = new DnsService();

export default dnsService;
