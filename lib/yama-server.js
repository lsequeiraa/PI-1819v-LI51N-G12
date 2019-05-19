'use strict'

let services    = './yama-services.js';
let db          =  './yama-db-mock.js';
let lastfm    = './lastfm.js';

const mock = false;
if (mock) {
    services    = './yama-services-mock.js';

}

const bdmock = false;
if (bdmock) {

    db          = './yama-db-mock.js';
    lastfm      = './lastfm-mock.js';
}

const debug = require('debug')('yama:server*');
const express = require('express');

const app = express();
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:60800");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(express.static('dist'))
require('./yama-web-api')(app, services, db, lastfm);

const port = 3000;

app.listen(port, (err) => {
    if (err)
        return debug(`Something bad happened: ${err}.`);
    debug(`Server running on port ${port}.`)
});