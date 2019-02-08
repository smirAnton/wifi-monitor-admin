import { UserModel } from '../models';

import { crypt, jwt } from '../utils';

import { ERRORS } from '../constants';

class AuthService {

  login = async (body = {}) => {
    try {
      const { username, password } = body;

      const user = await UserModel.findOne({ username });

      if (!user || crypt(password) !== user.password) {
        throw ERRORS.error(401, ERRORS.WRONG_USERNAME_OR_PASSWORD);
      }

      const token = jwt.sign({ id: user._id, username });

      return { token };
    } catch (ex) {
      throw ex;
    }
  };
}

const authService = new AuthService();

export default authService;
