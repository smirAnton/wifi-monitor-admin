import cookieParser from 'cookie-parser';
import compression from 'compression';
import bodyParser from 'body-parser';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import path from 'path';

import {
  httpCrossDomains,
  browserHistory,
  httpAuth
} from './middlewares';

import configureRoutes from './routes';

const app = express();

app.use(compression());
app.use(helmet());
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.static(path.resolve(__dirname, '../public')));
app.use(httpCrossDomains);

// secure access to apidoc for WiFi Monitor
app.use('/api-doc', httpAuth, express.static(path.resolve(__dirname, '../apidoc/wifimonitor')));
// inject all routes
configureRoutes(app);
// browser history for client
app.use(browserHistory);

export default app;
