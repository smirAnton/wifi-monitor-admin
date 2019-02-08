import { DeviceService, SnapshotService, SettingsService } from './services';
import { UserModel } from './models';

import { cron, createLogger } from './utils';

import { CRON } from './constants';

const logger = createLogger(module);

const ADMIN_USER = {
  username: 'admin@wifimonitor.com',
  password: 'Admin#wfm',
  lName: 'Smirnov',
  fName: 'Anton'
};

/**
 * @description Initinialize default snapshot for dictionaries
 * @async
 * @return {Promise} Exec promise
 */
export const initDefaultSnapshot = async () => {
  try {
    const snapshots = await SnapshotService.count();

    if (snapshots <= 0) {
      const initialSnapshot = await SnapshotService.create({
        description: 'Initial dictionaries version'
      });

      const [settings] = await SettingsService.fetchAll();

      if (settings) {
        await SettingsService.update(
          settings._id,
          { defaultDictionaryVersion: initialSnapshot.version }
        );
      }
    }
  } catch (ex) {
    // TODO inform admin
    logger.error(ex);
  }
};

/**
 * @description Initinialize admin user
 * @async
 * @return {Promise} Exec promise
 */
export const initAdminUser = async () => {
  try {
    const [admin] = await UserModel.find({ username: ADMIN_USER.username }).lean().exec();

    if (!admin) {
      await UserModel.create(ADMIN_USER);
    }
  } catch (ex) {
    // TODO inform admin
    logger.error(ex);
  }
};

/**
 * @description Initinialize all cron jobs
 * @async
 * @return {Promise} Exec promise
 */
export const initCronJobs = async () => {
  try {
    // for informing admins in case if WiFi Monitor offline
    cron.schedule({
      pattern: CRON.EVERY_1_MIN,
      worker: DeviceService.checkOfflineDevices,
      key: 'inform admins'
    });
  } catch (ex) {
    // TODO inform admin
    logger.error(ex);
  }
};
