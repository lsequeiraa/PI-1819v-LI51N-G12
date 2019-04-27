'use strict'

const request = require('request')

function cloneO (toC) {
    return JSON.parse(JSON.stringify(toC));
}

class YamaDB {
    constructor(baseUrl = 'http://localhost:9200/', dbIndex = 'yama') {
        //this.baseUrl = baseUrl;
        //this.dbIndex = dbIndex;

        this.dbUrl = baseUrl + dbIndex + '/'
        this.playlists = [];
        this.ids = 1;

        /*request.head(this.dbUrl)
            .on('response', (resp) => {
                if (resp.statusCode !== 200) throw new Error(`Index ${dbIndex} not available.`)
            })*/
    }
        
    getPlaylists (cb){
        let c = [];
        this.playlists.forEach((p) => {
            c.push(cloneO(p));
        });


        return cb(null,{
            'took': 2,
            'timed_out': false,
            '_shards': {
                'total': 1,
                'successful': 1,
                'skipped': 0,
                'failed': 0
            },
            'hits': {
                'total': {
                    'value': this.playlists.length,
                    'relation': 'eq'
                },
                'max_score': 1,
                'hits': c
            }
        });
    }

    postPlaylist (body, cb){

        let playlist = {
            'name' : body.name,
            'description' : body.description,
            'totalDuration' : 0,
            'tracks' : []
        };

        let c = cloneO(playlist);

        let id = this.ids++;

        this.playlists.push({
            '_index': 'yama',
            '_type': '_doc',
            '_id': id,
            '_version': 1,
            '_seq_no': 4,
            '_primary_term': 1,
            'found': true,
            '_source': c
        });

        return cb(null,{id:id, playlist});
    }
    
    getPlaylist(pId,cb){
        let result = {};
        this.playlists.filter((p) => {
            if (p._id === pId)
                result = p;
        });

        if (result === {})
            return cb(null,result);

        let c = cloneO(result);
        c['found'] = true;

        return cb(null, c);
    }
    
    deletePlaylist (pId, cb) {
        let playlist = {};

        this.playlists = this.playlists.filter((p) => {
            if (p._id !== pId)
                return true;

            playlist = p;
            return false;
        });

        return cb(null,playlist);
    }

    putPlaylist(pId, body, cb) {
        let result = {};
        let pos = 0;
        this.playlists.filter((p,i) => {
            if (p._id === pId) {
                result = p;
                pos = i;
            }
        });



        let url = this.dbUrl + '_update/' + pId;

        let dataF = '';

        let playlist = {};
        if (body.name) playlist['name'] = body.name;
        if (body.description) playlist['description'] = body.description;

        return request.post({
            'url':url,
            'body': {doc: playlist},
            'json':true
        })
            .on('error', err => cb(err))
            .on('data',data => dataF += data)
            .on('end', () => cb(null,{id: JSON.parse(dataF)._id, playlist}))
    }

    putPlaylistMusic(pId, track, cb){
        let toReturn = {};

        this.getPlaylist(pId,(err,result)=>{
            if(err)cb(err);

            toReturn = result._source;
            if (toReturn['tracks'].indexOf(track) === -1) {
                toReturn['tracks'].push(track);
                toReturn['totalDuration'] += track['duration'];
            }

            let dataF = '';

            return request.put({
                uri: this.dbUrl + '_doc/' + pId,
                'body': toReturn,
                'json': true
            })
                .on('error', err => cb(err))
                .on('data', data => dataF += data)
                .on('end', () => {
                    //if (error || response.statusCode !== 200) cb(err);
                    toReturn.id = pId;
                    cb(null, toReturn);
                });
        })
    }


    deletePlaylistMusic(pId, mId, cb){
        let toReturn = {}
        this.getPlaylist(pId,(err,result)=>{
            if(err)cb(err);
            toReturn = result._source;
            toReturn.tracks = toReturn.tracks.filter((t) => {
                if( t.mbid !== mId )
                    return true;

                toReturn.totalDuration -= t.duration;
                return false;
            });

            let dataF = ''

            return request.put({
                uri: this.dbUrl + '_doc/' + pId,
                'body': toReturn,
                'json': true
            })
                .on('error', err => cb(err))
                .on('data', data => dataF += data)
                .on('end', () => {
                    toReturn.id = pId;
                    cb(null, toReturn)
                });

        })
    }

    
}

module.exports = YamaDB