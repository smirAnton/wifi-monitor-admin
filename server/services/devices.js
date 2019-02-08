import moment from 'moment';
import Promise from 'bluebird';
import tcpPortUsed from 'tcp-port-used';

import BaseService from './base';

import { DeviceModel } from '../models';

import {
  createLogger,
  pagination,
  generator,
  filter,
  mailer,
  sort
} from '../utils';

import {
  DEVICE_PROJECTION,
  EMAIL_PATTERN,
  SEPARATOR,
  PORTS_MIN
} from '../constants';

const logger = createLogger(module);

const OFFLINE_TIME = 10; // min

class DeviceService extends BaseService {
  constructor() {
    super(DeviceModel, DEVICE_PROJECTION);
    this.usedPorts = [];
  }

  /**
   * @description Fetch all devices
   * @async
   * @param  {Object}  query Query object
   * @return {Promise} Exec ppromise
   */
  fetchAll = async (query = {}) => {
    try {
      const filterObj = filter({ ...query, isDevice: true }, 'search', 'secret');
      const sortObj = sort(query);
      const limit = pagination.limit(query);
      const skip = pagination.skip(query);

      const devices = await this.model
        .find(filterObj, this.projection)
        .sort(sortObj)
        .skip(skip)
        .limit(limit)
        .lean()
        .exec();

      const count = await this.model
        .find(filterObj)
        .count();

      if (devices[0]) {
        devices[0].count = count;
      }

      return devices;
    } catch (ex) {
      throw ex;
    }
  };

  /**
   * @description Fetch all ports from devices
   * @async
   * @return Array of ports
   */
  fetchAllPortPairs = async () => {
    try {
      const ports = await DeviceModel.find({}, '-_id portsUI ports', { lean: true });
      const parsedPorts = [];

      if (ports.length === 0) {
        parsedPorts.push(
          PORTS_MIN
        );
      } else {
        ports.forEach(elem => {
          for (const elemPorts of Object.keys(elem)) {
            parsedPorts.push(
              parseInt(elem[elemPorts].monitoring, 10),
              parseInt(elem[elemPorts].ssh, 10)
            );
          }
        });
        parsedPorts.sort((e1, e2) => {
          return e1 - e2;
        });
      }
      return parsedPorts;
    } catch (err) {
      throw err;
    }
  };

  /**
   * @description Get free port for device
   * @async
   * @return Free port pair
   */
  getFreePortPair = async () => {
    try {
      if (this.usedPorts.length === 0) {
        this.usedPorts = await this.fetchAllPortPairs();
      }

      const lastUsedPort = this.usedPorts[this.usedPorts.length - 1];

      let monitoring = lastUsedPort + 1;
      while (await tcpPortUsed.check(monitoring, '127.0.0.1')) {
        monitoring += 1;
      }
      let ssh = monitoring + 1;
      while (await tcpPortUsed.check(ssh, '127.0.0.1')) {
        ssh += 1;
      }
      this.usedPorts.push(monitoring, ssh);
      return {
        monitoring,
        ssh
      };
    } catch (err) {
      throw err;
    }
  };

  /**
   * @description Create new device / update existing one
   * @async
   * @param  {Object}  body Body object
   * @return {Promise} Exec ppromise
   */
  create = async (body = {}) => {
    try {
      let device = await DeviceModel.findOne({ mac: body.mac });

      if (device) {
        const changes = { updatedAt: new Date() };

        if (
          !device.portsUI ||
          (device.portsUI && (!device.portsUI.monitoring || !device.portsUI.ssh))
        ) {
          changes.portsUI = await this.getFreePortPair();
        }

        if (
          !device.ports ||
          (device.ports && (!device.ports.monitoring || !device.ports.ssh))
        ) {
          changes.ports = await this.getFreePortPair();
        }

        device = await DeviceModel.findByIdAndUpdate(
          device._id,
          changes,
          { lean: true, new: true }
        );
      } else {
        const devices = await this.fetchAll({});

        body.password = generator.generatePassword({ length: 10, numbers: true });
        body.portsUI = await this.getFreePortPair();
        body.secret = generator.generateSecret(devices);
        body.ports = await this.getFreePortPair();

        device = await DeviceModel.create(body);
      }
      this.usedPorts = [];

      return device;
    } catch (ex) {
      throw ex;
    }
  };

  /**
   * @description Check offline devices and inform admins
   * @async
   * @return {Promise} Exec ppromise
   */
  checkOfflineDevices = async () => {
    try {
      logger.info(SEPARATOR);
      logger.info('- Check offline devices - process started'.green);

      const now = moment();

      const devicesAll = await DeviceModel.find({}, DEVICE_PROJECTION).lean().exec();
      logger.info(`- Check offline devices - ${devicesAll.length} all devices`.green);

      const devicesOffline = devicesAll.filter(d =>
        parseInt(now.diff(moment(d.updatedAt), 'minutes'), 10) === OFFLINE_TIME
      );
      logger.info(`- Check offline devices - ${devicesOffline.length} offline devices`.green);

      if (devicesOffline.length > 0) {
        await Promise.each(devicesOffline, ({ adminEmail = '', _id }) => {
          if (EMAIL_PATTERN.test(adminEmail)) {
            return mailer.sendOfflineReport(adminEmail, { wfmId: `WFM ${_id}` });
          }
        });
      }

      logger.info('- Check offline devices - process finished'.green);
      logger.info(SEPARATOR);
    } catch (ex) {
      logger.error(ex);
    }
  };
}

const deviceService = new DeviceService();

export default deviceService;
