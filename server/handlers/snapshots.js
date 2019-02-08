import validate from 'validate.js';
import archiver from 'archiver';

import { SnapshotService } from '../services';

import { parser } from '../utils';

import {
  CSV_CATEGORIES_COLUMNS,
  CSV_SUPER_COLUMNS,
  CSV_NDPI_COLUMNS,
  CSV_DNS_COLUMNS,
  CONSTRAINTS,
  ERRORS
} from '../constants';

class SnapshotsHandler {

  fetchAll = (req, res, next) => {
    const { query } = req;

    const invalid = validate(query, CONSTRAINTS.VALID);

    if (invalid) {
      return next(ERRORS.error(400, ERRORS.BAD_REQUEST, invalid));
    }

    SnapshotService
      .fetchAll(query)
      .then(snapshots => res.status(200).send(snapshots))
      .catch(next);
  };

  create = (req, res, next) => {
    const { body } = req;

    const invalid = validate(body, CONSTRAINTS.VALID);

    if (invalid) {
      throw next(ERRORS.error(400, ERRORS.BAD_REQUEST, invalid));
    }

    SnapshotService
      .create({ description: body.description })
      .then(snapshot => res.status(200).send(snapshot))
      .catch(next);
  };

  update = (req, res, next) => {
    const { body, params: { id } } = req;

    const invalid = validate(body, CONSTRAINTS.VALID);

    if (invalid) {
      throw next(ERRORS.error(400, ERRORS.BAD_REQUEST, invalid));
    }

    SnapshotService
      .update(id, body)
      .then(snapshot => res.status(200).send(snapshot))
      .catch(next);
  };

  changeStatus = (req, res, next) => {
    const { body: { isActive }, params: { id } } = req;

    SnapshotService
      .patch(id, { isActive })
      .then(snapshot => res.status(200).send(snapshot))
      .catch(next);
  };

  restore = (req, res, next) => {
    const { params: { id } } = req;

    SnapshotService
      .restoreDictionariesVersion(id)
      .then(() => res.status(200).send({ ok: 1 }))
      .catch(next);
  };

  exportXLS = async (req, res, next) => {
    try {
      const archive = archiver('zip', { zlib: { level: 9 } }); // setup compression level
      const snapshot = await SnapshotService.fetchById(req.params.id);

      const dateLabel = new Date().toISOString().split('T')[0];
      const filename = `dictionaries_v${snapshot.version}_${dateLabel}.zip`;

      const categoryCsv = await parser.json2csv(snapshot.categorySnapshot, CSV_CATEGORIES_COLUMNS);
      const superCsv = await parser.json2csv(snapshot.superSnapshot, CSV_SUPER_COLUMNS);
      const ndpiCsv = await parser.json2csv(snapshot.ndpiSnapshot, CSV_NDPI_COLUMNS);
      const dnsCsv = await parser.json2csv(snapshot.dnsSnapshot, CSV_DNS_COLUMNS);

      archive.on('error', err => {
        throw next(ERRORS.error(500, err));
      });

      // set the archive name
      res.attachment(filename);

      // this is the streaming magic
      archive.pipe(res);

      archive.append(categoryCsv, { name: `category_v${snapshot.version}_${dateLabel}.csv` });
      archive.append(superCsv, { name: `super_v${snapshot.version}_${dateLabel}.csv` });
      archive.append(ndpiCsv, { name: `ndpi_v${snapshot.version}_${dateLabel}.csv` });
      archive.append(dnsCsv, { name: `dns_v${snapshot.version}_${dateLabel}.csv` });

      archive.finalize();
    } catch (err) {
      next(err);
    }
  };
}

export default new SnapshotsHandler();
