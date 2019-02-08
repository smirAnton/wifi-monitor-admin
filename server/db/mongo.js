import mongoose from 'mongoose';

import { createLogger } from '../utils';

mongoose.Promise = global.Promise;

const { env: {
  DB_MONGO_HOST,
  DB_MONGO_NAME,
  DB_MONGO_PORT,
  DB_MONGO_USER,
  DB_MONGO_PASS
} } = process;

const logger = createLogger(module);

mongoose.connect(
  DB_MONGO_HOST,
  DB_MONGO_NAME,
  DB_MONGO_PORT,
  {
    user: DB_MONGO_USER,
    pass: DB_MONGO_PASS
  }
);

const db = mongoose.connection;

function onConnected() {
  logger.info('📦  Connection with MongoDB has successfully established'.green);
}

function onError(err) {
  logger.info(err);
  logger.info('👻  No connection with database'.red);
  process.exit(1);
}

db.once('connected', onConnected);
db.on('error', onError);

export default db;
