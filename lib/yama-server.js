'use strict'

let services    = './yama-services.js';
let db          = './yama-db.js';
const lastfm    = './lastfm.js';
const utils     = './utils/utils.js';

let mock = false;
if (mock) {
    services    = './yama-services-mock.js';
    db          = './yama-db-mock.js';
}

const debug = require('debug')('yama:server*');
const http = require('http');
const webApi = new (require('./yama-web-api'))(services, db, lastfm, utils).exe;

const port = 3000;

http
    .createServer(webApi)
    .listen(port, () => debug(`Server running on port ${port}.`));