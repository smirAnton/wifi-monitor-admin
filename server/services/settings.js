import BaseService from './base';

import { SettingsModel } from '../models';

import { SETTINGS_PROJECTION } from '../constants';

class SettingsService extends BaseService {
  constructor() {
    super(SettingsModel, SETTINGS_PROJECTION);
  }
}

const settingsService = new SettingsService();

export default settingsService;
