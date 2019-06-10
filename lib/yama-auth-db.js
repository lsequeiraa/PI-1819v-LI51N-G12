'use strict';

const request = require('request');
const rp = require('request-promise');

class YamaAuthDB {
    constructor(baseUrl = 'http://localhost:9200/', dbIndex = 'users') {
        this.dbUrl = baseUrl + dbIndex + '/';
    }

    authUser(data) {
        let username = data.username;

        let url = this.dbUrl + `_doc/_search?q=username:${username}`;

        return new Promise( (resolve, reject) => {
            rp.get({
                'method': 'GET',
                'url': url,
                'json': true
            })
                .then(body => {
                    if (body.hits.hits.length === 0) {
                        resolve(null);
                    }

                    let first = body.hits.hits[0];

                    resolve({
                        'id': first._id,
                        'checkPass' : function(pass) {
                            return first._source.password === pass;
                        }
                    })
                })
                .catch( err => reject(err))
        })
    }

    postUser(data) {
        let url = this.dbUrl + '_doc';

        return new Promise( (resolve, reject) => {
            this.isUser(data.username)
                .then(() => {
                    let user = {
                        'username' : data.username,
                        'password' : data.password,
                        'playlists' : [],
                        'date' : Date.now()
                    };

                    rp({
                        'method' : 'POST',
                        'url' : url,
                        'body' : user,
                        'json' : true
                    })
                        .then(body => {
                            resolve({
                                'id' : body['_id'],
                                'user': {
                                    'username': user.username,
                                    'playlists': user.playlists
                                }
                            })
                        })
                        .catch(error => {
                            error['code'] = error.statusCode;
                            reject(error)
                        })
                })
                .catch(() => {
                    let err = {};
                    err.code = 400;
                    err.message = 'User already exists';

                    reject(err);
                })
        })
    }

    getUser(id) {
        let url = this.dbUrl + '_doc/' + id.id;
        return new Promise( (resolve, reject) => {
            rp({
                'method' : 'GET',
                'url' : url,
                'json' : true
            })
                .then(body => {
                    resolve({
                        'id': body['_id'],
                        'user': {
                            'username': body['_source']['username'],
                            'playlists': body['_source']['playlists']
                        }
                    })
                })
                .catch(error => {
                    error['code'] = error.statusCode;
                    reject(error)
                })
        })
    }

    isUser(username) {
        return new Promise( (resolve, reject) => {
            rp({
                method: 'GET',
                url: this.dbUrl + '_search?q=username:' + username,
                encoding: 'utf8',
                json: true
            })
                .then(data => {
                    if (data.hits.total.value > 0) reject();
                    else resolve();
                })
        })
    }
}

module.exports = YamaAuthDB;