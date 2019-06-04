'use strict';

const request = require('request');
const rp = require('request-promise');

class YamaAuthDB {
    constructor(baseUrl = 'http://localhost:9200/', dbIndex = 'users') {
        //this.baseUrl = baseUrl;
        //this.dbIndex = dbIndex;

        this.dbUrl = baseUrl + dbIndex + '/';

        /*request.head(this.dbUrl)
            .on('response', (resp) => {
                if (resp.statusCode !== 200) throw new Error(`Index ${dbIndex} not available.`)
            })
            .on('error', () => {
                throw new Error(`Index ${dbIndex} not available.`);
            })*/
    }

    authUser(data) {
        let username = data.username;
        //let password = data.password;

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
                        'id' : first._id,
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
        //let refresh = this.dbUrl + '_refresh';

        return new Promise( (resolve, reject) => {
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
                    //rp.post(refresh);

                    resolve({
                        'id' : body['_id'],
                        'user': {
                            'username': body['_source']['username'],
                            'playlists': body['_source']['username']
                        }
                    })
                })
                .catch(error => {
                    error['code'] = error.statusCode;
                    reject(error)
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
                            'playlists': body['_source']['username']
                        }
                    })
                })
                .catch(error => {
                    error['code'] = error.statusCode;
                    reject(error)
                })
        })
    }
}

module.exports = YamaAuthDB;