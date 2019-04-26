'use strict'

module.exports = function() {
    getArtists();
    getArtistTopAlbums();
    getAlbum();
    postPlaylist();
    putPlaylist();
    getPlaylists();
    getPlaylist();
    putPlaylistMusic();
    deletePlaylistMusic();

    return routes;
};

const url = require('url');
const debug = require('debug')('yama:routes*');

let routes = [];

function generalThener (resp, data) {
    resp.statusCode = 200;
    resp.setHeader('Content-Type', 'application/json');
    resp.end(JSON.stringify(data));
}

function generalCatcher (resp, err) {
    resp.statusCode = err.code;
    resp.end(err.message);
}

function getArtists() {
    //GET /artist
    const METHOD = 'GET';
    const URI = 'artist';

    routes.push(function (req, resp, yama) {
        const myUrl = url.parse(req.url, true);
        let fork = myUrl.pathname.split('/');

        if(!(req.method === METHOD && fork.length === 2 && fork[1] === URI))
            return false;

        debug('Routed to: GET /artist');

        yama.getArtists(myUrl.query, function (err, data) {
            if (err) generalCatcher(resp, err);
            else generalThener(resp, data);
        });

        /*yama.getArtists(myUrl.query)
            .then((data) => {
                resp.statusCode = 200;
                resp.setHeader('Content-Type', 'application/json');
                resp.end(JSON.stringify(data));
            })
            .catch((err)=>{
                resp.statusCode = err.code;
                resp.end(err.message);
            });*/

        return true;
    })
}
function getArtistTopAlbums() {
    //GET /artist/{arMBID}
    let METHOD = 'GET';
    let URI = 'artist';

    routes.push(function (req, resp, yama) {
        const myUrl = url.parse(req.url, true);
        let fork = myUrl.pathname.split('/');

        if(!(req.method === METHOD && fork.length === 3 && fork[1] === URI))
            return false;

        debug('Routed to: GET /artist/{arMBID}');

        yama.getArtistTopAlbums(fork[2], myUrl.query, function (err,data) {
            if (err) generalCatcher(resp, err);
            else generalThener(resp, data);
        });

        /*yama.getArtistTopAlbums(fork[2], myUrl.query)
            .then((data) => {
                resp.statusCode = 200;
                resp.setHeader('Content-Type', 'application/json');
                resp.end(JSON.stringify(data));
            })
            .catch((err)=>{
                resp.statusCode = err.code;
                resp.end(err.message);
            });*/

        return true;
    })
}
function getAlbum() {
    //GET /album/{mbid}
    let METHOD = 'GET';
    let URI = 'album';

    routes.push(function (req, resp, yama) {
        const myUrl = url.parse(req.url, true);
        let fork = myUrl.pathname.split('/');

        if(!(req.method === METHOD && fork.length === 3 && fork[1] === URI))
            return false;

        debug('Routed to: GET /album/{mbid}');

        yama.getAlbum(fork[2], function (err,data) {
            if (err) generalCatcher(resp, err);
            else generalThener(resp, data);
        });

        /*yama.getAlbum(fork[2])
            .then((data) => {
                resp.statusCode = 200;
                resp.setHeader('Content-Type', 'application/json');
                resp.end(JSON.stringify(data));
            })
            .catch((err)=>{
                resp.statusCode = err.code;
                resp.end(err.message);
            });*/

        return true;
    })
}

function postPlaylist() {
    //POST /playlists
    const METHOD = 'POST';
    const URI = 'playlists';

    const contentType = 'application/json';

    routes.push(function (req, resp, yama) {
        const myUrl = url.parse(req.url, true);
        let fork = myUrl.pathname.split('/');

        if(!(req.method === METHOD && fork.length === 2 && fork[1] === URI && req.headers['content-type'] === contentType))
            return false;

        debug('Routed to: POST /playlists');

        let body = '';
        req.on('data',(chunk)=> body+=chunk);
        req.on('end',()=> {
            if (body !== '')
                body = JSON.parse(body);
            else body = {};

            yama.postPlaylist(body, function (err,data) {
                if (err) generalCatcher(resp, err);
                else generalThener(resp, data);
            });

            /*yama.postPlaylist(body)
                .then((data) => {
                    resp.statusCode = 200;
                    resp.setHeader('Content-Type', 'application/json');
                    resp.end(JSON.stringify(data));
                })
                .catch((err) => {
                    resp.statusCode = err.code;
                    resp.end(err.message);
                });*/
        });
        return true;
    })
}
function putPlaylist() {
    //PUT /playlists/{pId}
    const METHOD = 'PUT';
    const URI = 'playlists';

    const contentType = 'application/json';

    routes.push(function (req, resp, yama) {
        const myUrl = url.parse(req.url, true);
        let fork = myUrl.pathname.split('/');

        if(!(req.method === METHOD && fork.length === 3 && fork[1] === URI && req.headers['content-type'] === contentType))
            return false;

        debug('Routed to: PUT /playlists/{pId}');

        let body = '';
        req.on('data',(chunk)=> body+=chunk);
        req.on('end',()=> {
            if (body !== '')
                body = JSON.parse(body);
            else body = {};


            yama.putPlaylist(fork[2], body, function (err,data) {
                if (err) generalCatcher(resp, err);
                else generalThener(resp, data);
            });

            /*yama.putPlaylist(fork[2], body)
                .then((data) => {
                    resp.statusCode = 200;
                    resp.setHeader('Content-Type', 'application/json');
                    resp.end(JSON.stringify(data));
                })
                .catch((err) => {
                    resp.statusCode = err.code;
                    resp.end(err.message);
                });*/
        });
        return true;
    })
}
function getPlaylists() {
    //GET /playlists
    const METHOD = 'GET';
    const URI = 'playlists';

    routes.push(function (req, resp, yama) {
        const myUrl = url.parse(req.url, true);
        let fork = myUrl.pathname.split('/');

        if(!(req.method === METHOD && fork.length === 2 && fork[1] === URI))
            return false;

        debug('Routed to: GET /playlists');

        yama.getPlaylists(function (err,data) {
            if (err) generalCatcher(resp, err);
            else generalThener(resp, data);
        });

        /*yama.getPlaylists()
            .then((data) => {
                resp.statusCode = 200;
                resp.setHeader('Content-Type', 'application/json');
                resp.end(JSON.stringify(data));
            })
            .catch((err)=>{
                resp.statusCode = err.code;
                resp.end(err.message);
            });*/

        return true;
    })
}
function getPlaylist() {
    //GET /playlists/{pid}
    const METHOD = 'GET';
    const URI = 'playlists';

    routes.push(function (req, resp, yama) {
        const myUrl = url.parse(req.url, true);
        let fork = myUrl.pathname.split('/');

        if(!(req.method === METHOD && fork.length === 3 && fork[1] === URI))
            return false;

        debug('Routed to: GET /playlists/{pid}');

        yama.getPlaylist(fork[2], function (err,data) {
            if (err) generalCatcher(resp, err);
            else generalThener(resp, data);
        });

        /*yama.getPlaylist(fork[2])
            .then((data) => {
                resp.statusCode = 200;
                resp.setHeader('Content-Type', 'application/json');
                resp.end(JSON.stringify(data));
            })
            .catch((err)=>{
                resp.statusCode = err.code;
                resp.end(err.message);
            });*/

        return true;
    })
}
function putPlaylistMusic() {
    //PUT /playlists/{pId}/music/{mId}
    const METHOD = 'PUT';
    const URI1 = 'playlists';
    const URI2 = 'music';

    routes.push(function (req, resp, yama) {
        const myUrl = url.parse(req.url, true);
        let fork = myUrl.pathname.split('/');

        if(!(req.method === METHOD && fork.length === 4 && fork[1] === URI1 && fork[3] === URI2))
            return false;

        debug('Routed to: PUT /playlists/{pId}/music');
        let body = '';
        req.on('data',(chunk)=> body+=chunk);
        req.on('end',()=> {
            if (body !== '')
                body = JSON.parse(body);
            else body = {};


            yama.putPlaylistMusic(fork[2], body, function (err,data) {
                if (err) generalCatcher(resp, err);
                else generalThener(resp, data);
            });
        });
        /*yama.putPlaylistMusic(fork[2], fork[4], body)
            .then((data) => {
                resp.statusCode = 200;
                resp.setHeader('Content-Type', 'application/json');
                resp.end(JSON.stringify(data));
            })
            .catch((err) => {
                resp.statusCode = err.code;
                resp.end(err.message);
            });*/
        return true;
    })
}
function deletePlaylistMusic() {
    //DELETE /playlists/{pid}/music/{mbid}
    const METHOD = 'DELETE';
    const URI1 = 'playlists';
    const URI2 = 'music';

    routes.push(function (req, resp, yama) {
        const myUrl = url.parse(req.url, true);
        let fork = myUrl.pathname.split('/');

        if(!(req.method === METHOD && fork.length === 5 && fork[1] === URI1 && fork [3] === URI2))
            return false;

        debug('Routed to: DELETE /playlists/{pid}/music/{mbid}');

        yama.deletePlaylistMusic(fork[2], fork[4], function (err,data) {
            if (err) generalCatcher(resp, err);
            else generalThener(resp, data);
        });
        /*yama.deletePlaylist(fork[2], fork[4])
            .then((data) => {
                resp.statusCode = 200;
                resp.setHeader('Content-Type', 'application/json');
                resp.end(JSON.stringify(data));
            })
            .catch((err)=>{
                resp.statusCode = err.code;
                resp.end(err.message);
            });*/

        return true;
    })
}