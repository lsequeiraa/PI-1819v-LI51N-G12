const fs = require('fs');
const url = require('url');
const debug = require('debug')('yama:webApi*');

const routes = require("./routes/routes.js")();

function resourceNotFound(req, resp) {
    debug('Non known route!');
    resp.statusCode = 404;
    resp.end('Resource Not Found!');
    return true
}

class WebApi {
    constructor(services = './yama-services.js', db = './yama-db.js', lastfm = './lastfm.js', utils = './utils/utils.js') {
        this.services = new (require(services))(new (require(db)), require(lastfm));



        /*this.requires = {
            'services': new (require(services))(new (require(foca_db)), require(football_data)),
            'utils': require(utils)
        };

        fs.readdir(dir, {withFileTypes: true}, (err, files) => {
            files.forEach(file => {
                if (!file.isDirectory())
                    routes[file.name.split('.')[0]] = new (require(dir + '/' + file.name))(this.requires);
            });
        });*/
    }

    exe (req, res) {
        debug(req.method + ' ' + req.url);
        for (let i = 0; i < routes.length; i++)
            if (routes[i](req, res, this.services)) {
                // The route sends a response
                return;
            }

        resourceNotFound(req, res);
    }
}

module.exports = WebApi;