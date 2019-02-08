import validate from 'validate.js';

import { DnsDictionaryService, SnapshotService } from '../../services';

import { helper } from '../../utils';

import {
  CONSTRAINTS,
  ERRORS
} from '../../constants';

class DnsDictionaryHandler {

  create = (req, res, next) => {
    const { body } = req;

    const required = validate(body, CONSTRAINTS.REQUIRED());
    const invalid = validate(body, CONSTRAINTS.VALID);

    if (required || invalid) {
      return next(ERRORS.error(400, ERRORS.BAD_REQUEST, required || invalid));
    }

    DnsDictionaryService
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

      let items = await DnsDictionaryService.fetchAll(query);

      if (query.version) {
        const [snapshot] = await SnapshotService.fetchAll({ version: query.version });
        items = snapshot.dnsSnapshot;
      }

      res.status(200).send({
        items: query.isWfm ? helper.sortDNSByCategories(items) : items
      });
    } catch (err) {
      next(err);
    }
  };

  fetchById = (req, res, next) => {
    const { params: { id } } = req;

    const required = validate({ id }, CONSTRAINTS.REQUIRED('id'));
    const invalid = validate({ id }, CONSTRAINTS.VALID);

    if (required || invalid) {
      return next(ERRORS.error(400, ERRORS.BAD_REQUEST, required || invalid));
    }

    DnsDictionaryService
      .fetchById(id)
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

    DnsDictionaryService
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

    DnsDictionaryService
      .remove(params.id)
      .then(item => res.status(200).send({ item }))
      .catch(next);
  };

  exportDNS = (req, res, next) => {
    DnsDictionaryService
      .fetch4export()
      .then(csv => {
        const dateLabel = new Date().toISOString().split('T')[0];
        const filename = `dns_${dateLabel}.csv`;

        res.set('Content-Type', 'application/octet-stream');
        res.attachment(filename);
        res.status(200).send(csv);
      })
      .catch(next);
  };
}

const dnsDictionaryHandler = new DnsDictionaryHandler();

export default dnsDictionaryHandler;
