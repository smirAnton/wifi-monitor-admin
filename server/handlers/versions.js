import validate from 'validate.js';

import { VersionService } from '../services';

import {
  CONSTRAINTS,
  ERRORS
} from '../constants';

class VersionHandler {

  create = (req, res, next) => {
    const { body } = req;

    const required = validate(body, CONSTRAINTS.REQUIRED());
    // const invalid = validate(body, CONSTRAINTS.VALID);

    if (required/* || invalid */) {
      return next(ERRORS.error(400, ERRORS.BAD_REQUEST, required/* || invalid */));
    }

    VersionService
      .create(body)
      .then(item => res.status(200).send({ item }))
      .catch(next);
  };

  fetchAll = (req, res, next) => {
    VersionService
      .fetchAll()
      .then(items => res.status(200).send({ items }))
      .catch(next);
  };
}

const versionHandler = new VersionHandler();

export default versionHandler;
