import validate from 'validate.js';

import { SettingsService } from '../services';

import {
  CONSTRAINTS,
  ERRORS
} from '../constants';

class SettingsHandler {

  fetchAll = (req, res, next) => {
    SettingsService
      .fetchAll()
      .then(items => res.status(200).send({ items }))
      .catch(next);
  };

  update = (req, res, next) => {
    const { params, body } = req;

    const required = validate(body, CONSTRAINTS.REQUIRED());
    // const invalid = validate(body, CONSTRAINTS.VALID);

    if (required/* || invalid */) {
      return next(ERRORS.error(400, ERRORS.BAD_REQUEST, required/* || invalid */));
    }

    SettingsService
      .update(params.id, body)
      .then(item => res.status(200).send({ item }))
      .catch(next);
  };
}

const settingsHandler = new SettingsHandler();

export default settingsHandler;
