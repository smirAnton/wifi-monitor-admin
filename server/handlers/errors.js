import { ERRORS } from '../constants';

/*
  eslint
  no-unused-vars: 'off'
 */
class ErrorHandler {

  notFound = (req, res, next) => {
    next(ERRORS.error(404, ERRORS.NOT_FOUND));
  };

  serverError = (err, req, res, next) => {
    res.status(err.statusCode || err.status || 500).send({ ...ERRORS.error(), ...err });
  };
}

const errorHandler = new ErrorHandler();

export default errorHandler;
