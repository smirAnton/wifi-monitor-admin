import validate from 'validate.js';

import { AuthService } from '../services';

import {
  CONSTRAINTS,
  ERRORS
} from '../constants';

class AuthHandler {

  login = (req, res, next) => {
    const { body } = req;

    const required = validate(body, CONSTRAINTS.REQUIRED('username', 'password'));
    const invalid = validate(body, CONSTRAINTS.VALID);

    if (required || invalid) {
      return next(ERRORS.error(400, ERRORS.BAD_REQUEST, required || invalid));
    }

    AuthService
      .login(body)
      .then(token => res.status(200).send(token))
      .catch(next);
  };
}

const authHandler = new AuthHandler();

export default authHandler;
