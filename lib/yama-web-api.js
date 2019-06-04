const url = require('url');
const debug = require('debug')('yama:webApi*');

module.exports = function (app, services = './yama-services.js', db = './yama-db.js', lastfm = './lastfm.js', authService = './yama-auth-service.js', authDb = './yama-auth-db.js') {
    //let auth = new (require(authService))(new (require(authDb)));
    let yama = new (require(services))(new (require(db)), require(lastfm));

    app.use(logger);
    require('./yama-auth.js')(app, new (require(authService))(new (require(authDb))));
    require('./routes/routes.js')(app, yama);
    app.use(resourceNotFound);
};

function logger(req, resp, next) {
    const myUrl = url.parse(req.url);
    debug(`${Date()}: request to ${myUrl.pathname}`);
    next();
}

function resourceNotFound(req, resp) {
    debug('Non known route!');
    resp.status(404).send('Resource Not Found!')
}