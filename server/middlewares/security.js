import { jwt } from '../utils';

import { ERRORS } from '../constants';

export default (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers.token;

  if (!token) {
    return next(ERRORS.error(403, ERRORS.FORBIDDEN));
  }

  jwt
    .verify(token)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(() => {
      next(ERRORS.error(403, ERRORS.FORBIDDEN));
    });
};
