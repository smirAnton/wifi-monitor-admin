import ip from 'ip';

import './db/mongo';

import app from './app';

import * as initializer from './initializer';

import { createLogger } from './utils';

import { SEPARATOR } from './constants';

const logger = createLogger(module);

(async () => {
  try {
    await initializer.initAdminUser();
    logger.info('- Initinializer - admin user initialization completed'.magenta);

    await initializer.initDefaultSnapshot();
    logger.info('- Initinializer - snapshots initialization completed'.magenta);

    await initializer.initCronJobs();
    logger.info('- Initinializer - jobs initialization completed'.magenta);

    app.listen(parseInt(process.env.PORT, 10), () => {
      logger.info(SEPARATOR);
      logger.info(`Server started in ${process.env.NODE_ENV} mode`.green);
      logger.info(`Server listens at: http://${ip.address()}:${process.env.PORT}/`.green);
      logger.info(SEPARATOR);
    });
  } catch (ex) {
    logger.error(ex);
  }
})();
