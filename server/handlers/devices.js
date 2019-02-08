import serverIp from 'ip';
import validate from 'validate.js';

import { DeviceService } from '../services';

import {
  CONSTRAINTS,
  ERRORS
} from '../constants';

class DeviceHandler {

  fetchAll = (req, res, next) => {
    const { query } = req;

    const required = validate(query, CONSTRAINTS.REQUIRED());
    const invalid = validate(query, CONSTRAINTS.VALID);

    if (required || invalid) {
      return next(ERRORS.error(400, ERRORS.BAD_REQUEST, required || invalid));
    }

    DeviceService
      .fetchAll(query)
      .then(items => res.status(200).send({ items }))
      .catch(next);
  };

  update = (req, res, next) => {
    const { params: { id }, body } = req;

    const required = validate({ ...body, id }, CONSTRAINTS.REQUIRED('id'));
    const invalid = validate({ ...body, id }, CONSTRAINTS.VALID);

    if (required || invalid) {
      return next(ERRORS.error(400, ERRORS.BAD_REQUEST, required || invalid));
    }

    DeviceService
      .update(id, body)
      .then(item => res.status(200).send({ item }))
      .catch(next);
  };

  getInternalIP = (req, res, next) => {
    const { query } = req;

    const required = validate(query, CONSTRAINTS.REQUIRED());
    const invalid = validate(query, CONSTRAINTS.VALID);

    if (required || invalid) {
      return next(ERRORS.error(400, ERRORS.BAD_REQUEST, required || invalid));
    }

    DeviceService
      .fetchAll(query)
      .then(items => {
        if (items.length) {
          const [device] = items;
          const externalIP = `${serverIp.address()}:${device.portsUI.ssh}`;
          const ip = device.shouldUseRemoteAccess
            ? externalIP
            : device.internalIP;

          res.status(200).send({
            shouldUseRemoteAccess: device.shouldUseRemoteAccess,
            internalIP: device.internalIP,
            externalIP,
            ip
          });
        } else {
          return next(ERRORS.error(400, ERRORS.WRONG_SECRET));
        }
      })
      .catch(next);
  };

  create = (req, res, next) => {
    const { body } = req;

    const required = validate(body, CONSTRAINTS.REQUIRED());
    const invalid = validate(body, CONSTRAINTS.VALID);

    if (required || invalid) {
      return next(ERRORS.error(400, ERRORS.BAD_REQUEST, required || invalid));
    }

    DeviceService
      .create(body)
      .then(item => res.status(200).send({ item }))
      .catch(next);
  };

  generateSecret = (req, res, next) => {
    const { body } = req;

    const required = validate(body, CONSTRAINTS.REQUIRED());
    const invalid = validate(body, CONSTRAINTS.VALID);

    if (required || invalid) {
      return next(ERRORS.error(400, ERRORS.BAD_REQUEST, required || invalid));
    }

    DeviceService
      .generateSecret()
      .then(item => res.status(200).send({ item }))
      .catch(next);
  };
}

const deviceHandler = new DeviceHandler();

export default deviceHandler;
