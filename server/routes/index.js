import snapshotsRoutes from './snapshots';
import versionsRoutes from './versions';
import settingsRoutes from './settings';
import devicesRoutes from './devices';
import emailsRoutes from './emails';
import iconsRoutes from './icons';
import authRoutes from './auth';
import {
  superDictionaryRoutes,
  ndpiDictionaryRoutes,
  dnsDictionaryRoutes,
  categoriesRoutes
} from './dictionaries';

import { ErrorsHandler } from '../handlers';

/**
 * @apiDefine ErrorBlock
 * @apiError (Error 400) BadRequest    Some data is not valid.
 * @apiError (Error 401) Unauthorized  Need authentication.
 * @apiError (Error 403) Forbidden     Not enough rights.
 * @apiError (Error 404) PageNotFound  Sorry, but page not found.
 * @apiError (Error 5xx) InternalError Internal Server Error.
 *
 * @apiErrorExample Error-Response:
 *  HTTP/1.1 404 Not Found
 *  {
 *    "message": "Sorry, but data not found",
 *    "status": 404,
 *    "errors": []
 *  }
 *  HTTP/1.1 400 Bad Request
 *  {
 *    "message": "Some data is not valid",
 *    "status": 400,
 *    "errors": [
 *      "Id is invalid"
 *    ]
 *  }
 *  HTTP/1.1 500 Internal Server Error
 *  {
 *    "status": 500,
 *    "message": "Internal Server Error",
 *    "errors": []
 *  }
 *
 *  HTTP/1.1 401 Unauthorized
 *  {
 *    "message": "Unauthorized",
 *    "status": 401,
 *    "errors": []
 *  }
 *
 *  HTTP/1.1 403 Forbidden
 *  {
 *    "message": "Forbidden",
 *    "status": 403,
 *    "errors": []
 *  }
 */

export default app => {
  app.use('/api/auth', authRoutes);
  app.use('/api/icons', iconsRoutes);
  app.use('/api/emails', emailsRoutes);
  app.use('/api/devices', devicesRoutes);
  app.use('/api/settings', settingsRoutes);
  app.use('/api/versions', versionsRoutes);
  app.use('/api/snapshots', snapshotsRoutes);
  app.use('/api/dictionaries/dns', dnsDictionaryRoutes);
  app.use('/api/dictionaries/ndpi', ndpiDictionaryRoutes);
  app.use('/api/dictionaries/super', superDictionaryRoutes);
  app.use('/api/dictionaries/categories', categoriesRoutes);

  // errors handlers
  app.use('/api/*', ErrorsHandler.notFound);
  app.use('/api/*', ErrorsHandler.serverError);

  return app;
};
