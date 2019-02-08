const duplicatedKeys = ['email'];

export default {
  WRONG_USERNAME_OR_PASSWORD: 'Wrong username or password',
  DEVICE_NOT_RESPOND        : "Device's server does not work...",
  FILE_NOT_EXIST            : 'Not found such file',
  WRONG_SECRET              : 'Secret is incorrect',
  UNAUTHORIZED              : 'Unauthorized',
  BAD_REQUEST               : 'Bad request',
  FORBIDDEN                 : 'Forbidden',
  NOT_FOUND                 : 'Not found',
  ERR                       : 'Internal Server Error',

  DUPLICATE_FIELD_MESSAGE: 'This {field} is already in use. Please set another {field}',

  error: (status = 500, message, invalidObj) => {
    const err = new Error();
    let errors = [];
    let keysLength;
    let keys;
    let len;
    let i;

    err.message = message;
    err.status = status;

    if (invalidObj) {
      keys = Object.keys(invalidObj);
      keysLength = keys.length;

      for ((i = 0), (len = keysLength); i < len; i++) {
        errors = errors.concat(invalidObj[keys[i]]);
      }
    }

    err.errors = errors;

    return err;
  },

  mongo: (status, err) => {
    const error = new Error();
    let message;

    if (!err) return;

    function parseMongoDuplicateMessage(mes) {
      let len = duplicatedKeys.length;
      let dupField;

      while (len--) {
        if (mes.indexOf(duplicatedKeys[len]) > -1) {
          dupField = duplicatedKeys[len];
          break;
        }
      }

      return `This ${dupField} is already in use. Please set another ${dupField}`;
    }

    if (err.code === 11000) {
      message = parseMongoDuplicateMessage(err.message);
    }

    error.message = message || err.message;
    error.errors = [];
    error.status = status;

    return error;
  }
};
