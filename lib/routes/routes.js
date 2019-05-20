'use strict'

module.exports = function(app, yamaServices) {
    yama = yamaServices;

    getArtists(app);
    getArtistTopAlbums(app);
    getAlbum(app);
    postPlaylist(app);
    putPlaylist(app);
    getPlaylists(app);
    getPlaylist(app);
    putPlaylistMusic(app);
    deletePlaylistMusic(app);
};

const debug = require('debug')('yama:routes*');
let yama;

function generalThener (resp, data) {
    resp.statusCode = 200;
    resp.setHeader('Content-Type', 'application/json');
    resp.end(JSON.stringify(data));
}

function generalCatcher (resp, err) {
    if(!err || !err.code || !err.message){
        resp.statusCode = 500;
        resp.end('Server error')
    }
    else{
        resp.statusCode = err.code;
        resp.end(err.message);
    }
}

function checkContentType(req, resp, next) {
    const contentType = 'application/json';

    if (req.headers['content-type'] === contentType)
        next();
    else generalCatcher(resp, {
        code: 400,
        message: 'Incorrect content-type. Expected: application/json'
    })
}

function isLoggedIn(req, res, next) {
    if (req.session.user !== undefined) {
        next();
    } else {
        res.redirect('/#login');
    }
}


function getArtists(app) {
    //GET /artist
    const METHOD = 'GET';
    const PATH = '/artist';

    app[METHOD.toLocaleLowerCase()](PATH, function (req, resp){
        debug('Routed to: GET /artist');

        yama.getArtists(req.query)
            .then((data) => generalThener(resp, data))
            .catch((err) => generalCatcher(resp, err));
    })
}

function getArtistTopAlbums(app) {
    //GET /artist/{arMBID}
    let METHOD = 'GET';
    let PATH = '/artist/:mbid';

    app[METHOD.toLocaleLowerCase()](PATH, function (req, resp) {
        debug('Routed to: GET /artist/{mbid}');

        yama.getArtistTopAlbums(req.params['mbid'], req.query)
            .then((data) => generalThener(resp, data))
            .catch((err) => generalCatcher(resp, err));
    })
}

function getAlbum(app) {
    //GET /album/{mbid}
    let METHOD = 'GET';
    let PATH = '/album/:mbid';

    app[METHOD.toLocaleLowerCase()](PATH, function (req, resp) {
        debug('Routed to: GET /album/{mbid}');

        yama.getAlbum(req.params['mbid'])
            .then((data) => generalThener(resp, data))
            .catch((err) => generalCatcher(resp, err));
    })
}

function postPlaylist(app) {
    //POST /playlists
    const METHOD = 'POST';
    const PATH = '/playlists';

    app[METHOD.toLocaleLowerCase()](PATH, checkContentType, function (req, resp) {
        debug('Routed to: POST /playlists');

        let body = '';
        req.on('data',(chunk)=> body+=chunk);
        req.on('end',()=> {
            if (body !== '')
                body = JSON.parse(body);
            else body = {};

            yama.postPlaylist(body)
                .then((data) => generalThener(resp, data))
                .catch((err) => generalCatcher(resp, err));
        });
    })
}

function putPlaylist(app) {
    //PUT /playlists/{pId}
    const METHOD = 'PUT';
    const PATH = '/playlists/:pId';

    app[METHOD.toLocaleLowerCase()](PATH, checkContentType, function (req, resp) {
        debug('Routed to: PUT /playlists/{pId}');

        let body = '';
        req.on('data',(chunk)=> body+=chunk);
        req.on('end',()=> {
            if (body !== '')
                body = JSON.parse(body);
            else body = {};

            yama.putPlaylist(req.params['pId'], body)
                .then((data) => generalThener(resp, data))
                .catch((err) => generalCatcher(resp, err));
        });
    })
}

function getPlaylists(app) {
    //GET /playlists
    const METHOD = 'GET';
    const PATH = '/playlists';

    app[METHOD.toLocaleLowerCase()](PATH, function (req, resp) {
        debug('Routed to: GET /playlists');

        yama.getPlaylists()
            .then((data) => generalThener(resp, data))
            .catch((err) => generalCatcher(resp, err));
    })
}

function getPlaylist(app) {
    //GET /playlists/{pId}
    const METHOD = 'GET';
    const PATH = '/playlists/:pId';

    app[METHOD.toLocaleLowerCase()](PATH, function (req, resp) {
        debug('Routed to: GET /playlists/{pId}');

        yama.getPlaylist(req.params['pId'])
            .then((data) => generalThener(resp, data))
            .catch((err) => generalCatcher(resp, err));
    })
}

function putPlaylistMusic(app) {
    //PUT /playlists/{pId}/music
    const METHOD = 'PUT';
    const PATH = '/playlists/:pId/music';

    app[METHOD.toLocaleLowerCase()](PATH, function (req, resp) {
        debug('Routed to: PUT /playlists/{pId}/music');

        let body = '';
        req.on('data',(chunk)=> body+=chunk);
        req.on('end',()=> {
            if (body !== '')
                body = JSON.parse(body);
            else body = {};

            yama.putPlaylistMusic(req.params['pId'], body)
                .then((data) => generalThener(resp, data))
                .catch((err) => generalCatcher(resp, err));
        });
    })
}
function deletePlaylistMusic(app) {
    //DELETE /playlists/{pid}/music/{mbid}
    const METHOD = 'DELETE';
    const PATH = '/playlists/:pId/music/:mbid';

    app[METHOD.toLocaleLowerCase()](PATH, function (req, resp) {
        debug('Routed to: DELETE /playlists/{pid}/music/{mbid}');

        yama.deletePlaylistMusic(req.params['pId'], req.params['mbid'])
            .then((data) => generalThener(resp, data))
            .catch((err) => generalCatcher(resp, err));
    })
}