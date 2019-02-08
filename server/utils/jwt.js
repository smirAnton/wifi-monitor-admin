import jwt from 'jsonwebtoken';

const EXPIRE_TIME = '7d'; // expires in 7 days

export const sign = (tokenData = {}) => {
  return jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: EXPIRE_TIME });
};

export const verify = (token = '') => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      err ? reject(err) : resolve(decode);
    });
  });
};
