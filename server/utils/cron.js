import { CronJob } from 'cron';

import { createLogger, generator } from './logger';

import { CRON } from '../constants';

const logger = createLogger(module);

class Cron {
  /**
   * @description Run worker for more complicated inervals
   * @param {String}   key     Unique key for long term schedule
   * @param {Function} worker  Worker which should be trigger
   * @param {String}   pattern Scheduler pattern
   */
  schedule = ({
    pattern = CRON.EVERY_DAY_AT_23_59,
    worker = () => logger.error('Worker function not provided'),
    key = generator.generateKey()
  }) => {
    logger.info(`Pattern for schedule: ${key}: ${pattern}`.yellow);

    // if exist just stop it
    if (this[key]) {
      this[key].stop();
    }
    // create new job
    this[key] = new CronJob(
      pattern,    // schedule pattern
      worker,     // worker function
      () => {},   // will trigger when after execution
      false,      // start the job right now
    );

    this[key].start();
  };
}

const cron = new Cron();

export default cron;
