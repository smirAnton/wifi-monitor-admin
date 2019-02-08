process.title = 'WiFi-Monitor-Maintenance-Panel';
process.env.TZ = 'UTC';

const unrecognizedMode = !['production', 'development'].includes(process.env.NODE_ENV);

if (unrecognizedMode) {
  process.env.NODE_ENV = 'production';
}

const path = `${process.cwd()}/server/config/.env.${process.env.NODE_ENV}`;

require('colors');
require('dotenv').config({ path });
require('babel-register');
require('babel-polyfill');
require('./server/server.js');
