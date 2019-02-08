import validate from 'validate.js';

import { NdpiDictionaryService, SnapshotService } from '../../services';

import { helper } from '../../utils';

import {
  CONSTRAINTS,
  ERRORS
} from '../../constants';

class NDPIDictionaryHandler {

  create = (req, res, next) => {
    const { body } = req;

    const required = validate(body, CONSTRAINTS.REQUIRED());
    const invalid = validate(body, CONSTRAINTS.VALID);

    if (required || invalid) {
      return next(ERRORS.error(400, ERRORS.BAD_REQUEST, required || invalid));
    }

    NdpiDictionaryService
      .create(body)
      .then(item => res.status(200).send({ item }))
      .catch(next);
  };

  fetchAll = async (req, res, next) => {
    try {
      const { query } = req;

      const invalid = validate(query, CONSTRAINTS.VALID);

      if (invalid) {
        return next(ERRORS.error(400, ERRORS.BAD_REQUEST, invalid));
      }

      let items = await NdpiDictionaryService.fetchAll(query);

      if (query.version) {
        const [snapshot] = await SnapshotService.fetchAll({ version: query.version });
        items = snapshot.ndpiSnapshot;
      }

      res.status(200).send({
        items: query.isWfm ? helper.sortNDPIByCategories(items) : items
      });
    } catch (err) {
      next(err);
    }
  };

  fetchById = (req, res, next) => {
    const { params } = req;

    const required = validate(params, CONSTRAINTS.REQUIRED('id'));
    const invalid = validate(params, CONSTRAINTS.VALID);

    if (required || invalid) {
      return next(ERRORS.error(400, ERRORS.BAD_REQUEST, required || invalid));
    }

    NdpiDictionaryService
      .fetchById(params.id)
      .then(item => {
        if (!item) {
          return next(ERRORS.error(400, ERRORS.BAD_REQUEST));
        }
        res.status(200).send({ item });
      })
      .catch(next);
  };

  update = (req, res, next) => {
    const { params: { id }, body } = req;

    const required = validate({ ...body, id }, CONSTRAINTS.REQUIRED('id'));
    const invalid = validate({ ...body, id }, CONSTRAINTS.VALID);

    if (required || invalid) {
      return next(ERRORS.error(400, ERRORS.BAD_REQUEST, required || invalid));
    }

    NdpiDictionaryService
      .update(id, body)
      .then(item => res.status(200).send({ item }))
      .catch(next);
  };

  delete = (req, res, next) => {
    const { params } = req;

    const required = validate(params, CONSTRAINTS.REQUIRED('id'));
    const invalid = validate(params, CONSTRAINTS.VALID);

    if (required || invalid) {
      return next(ERRORS.error(400, ERRORS.BAD_REQUEST, required || invalid));
    }

    NdpiDictionaryService
      .remove(params.id)
      .then(item => res.status(200).send({ item }))
      .catch(next);
  };

  exportNDPI = (req, res, next) => {
    NdpiDictionaryService
      .fetch4export()
      .then(csv => {
        const dateLabel = new Date().toISOString().split('T')[0];
        const filename = `ndpi_${dateLabel}.csv`;

        res.set('Content-Type', 'application/octet-stream');
        res.attachment(filename);
        res.status(200).send(csv);
      })
      .catch(next);
  }
}

const ndpiDictionaryHandler = new NDPIDictionaryHandler();

export default ndpiDictionaryHandler;
