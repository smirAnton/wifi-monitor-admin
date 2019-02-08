import validate from 'validate.js';

import { IconService } from '../services';

import {
  CONSTRAINTS,
  ERRORS
} from '../constants';

class IconHandler {

  fetchAll = (req, res, next) => {
    IconService
      .fetchAll()
      .then(items => res.status(200).send({ items }))
      .catch(next);
  };

  addKeyword = (req, res, next) => {
    const { body } = req;

    const required = validate(body, CONSTRAINTS.REQUIRED('_id', 'keyword'));
    const invalid = validate(body, CONSTRAINTS.VALID);

    if (required || invalid) {
      return next(ERRORS.error(400, ERRORS.BAD_REQUEST, required || invalid));
    }

    IconService
      .addKeyword(body._id, body.keyword)
      .then(item => res.status(200).send({ item }))
      .catch(next);
  };

  removeKeyword = (req, res, next) => {
    const { params: { id }, query } = req;

    const required = validate({ ...query, id }, CONSTRAINTS.REQUIRED('id', 'keywordId'));
    const invalid = validate({ ...query, id }, CONSTRAINTS.VALID);

    if (required || invalid) {
      return next(ERRORS.error(400, ERRORS.BAD_REQUEST, required || invalid));
    }

    IconService
      .removeKeyword(id, query.keywordId)
      .then(item => res.status(200).send({ item }))
      .catch(next);
  };
}

const iconHandler = new IconHandler();

export default iconHandler;
