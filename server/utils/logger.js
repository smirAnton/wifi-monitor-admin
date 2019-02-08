import expressWinston from 'express-winston';
import winston from 'winston';
import path from 'path';

const DEVELOPMENT = process.env.NODE_ENV === 'development';

export const createLogger = module => {
  const transports = [];
  const dir = module.filename.split(path.sep).splice(-2).join(path.sep);

  if (DEVELOPMENT) {
    transports.push(
      new winston.transports.Console({
        colorize: true,
        level: 'debug',
        label: dir,
        prettyPrint: true
      })
    );
  } else {
    transports.push(
      new winston.transports.File({
        colorize: true,
        filename: `${process.cwd()}/logs/app-logs.log`,
        maxFiles: 10,
        maxsize: '10000000', // 10 MB
        level: 'error',
        label: dir
      })
    );
  }

  return new winston.Logger({ transports });
};

export const expressLogger = expressWinston.logger({
  transports: [
    new winston.transports.Console({
      json: true,
      colorize: true
    })
  ],
  level: DEVELOPMENT ? 'debug' : 'error',
  meta: true,
  msg: 'HTTP {{req.method}} {{req.url}}',
  expressFormat: true,
  colorStatus: true,
  ignoreRoute: () => false
});

export default {
  expressLogger,
  createLogger
};
