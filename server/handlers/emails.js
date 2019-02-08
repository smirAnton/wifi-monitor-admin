import validate from 'validate.js';

import { EmailService } from '../services';

import { CONSTRAINTS, ERRORS } from '../constants';

class EmailHandler {

  getBlocked = (req, res, next) => {
    const { query } = req;

    const required = validate(query, CONSTRAINTS.REQUIRED());
    const invalid = validate(query, CONSTRAINTS.VALID);

    if (required || invalid) {
      return next(ERRORS.error(400, ERRORS.BAD_REQUEST, required || invalid));
    }

    EmailService
      .getBlocked(query)
      .then(items => res.status(200).send({ items }))
      .catch(next);
  };

  getUnsubscribed = (req, res, next) => {
    const { query } = req;
    const required = validate(query, CONSTRAINTS.REQUIRED());
    const invalid = validate(query, CONSTRAINTS.VALID);

    if (required || invalid) {
      return next(ERRORS.error(400, ERRORS.BAD_REQUEST, required || invalid));
    }
    EmailService
      .getUnsubscribed(query)
      .then(items => res.status(200).send({ items }))
      .catch(next);
  };

  removeBlocked = (req, res, next) => {
    const { query } = req;

    const required = validate(query, CONSTRAINTS.REQUIRED('emails'));
    const invalid = !(validate.isArray(query.emails) && query.emails.length > 0);

    if (required || invalid) {
      return next(ERRORS.error(400, ERRORS.BAD_REQUEST, required || invalid));
    }

    EmailService
      .removeBlocked(query.emails)
      .then(() => res.status(200).send({ ok: 1 }))
      .catch(next);
  };

  removeUnsubscribed = (req, res, next) => {
    const { query } = req;

    const required = validate(query, CONSTRAINTS.REQUIRED('email'));
    const invalid = validate(query, CONSTRAINTS.VALID);

    if (required || invalid) {
      return next(ERRORS.error(400, ERRORS.BAD_REQUEST, required || invalid));
    }
    EmailService
      .removeUnsubscribed(query.email)
      .then(() => res.status(200).send({ ok: 1 }))
      .catch(next);
  };

}

const emailHandler = new EmailHandler();

export default emailHandler;
