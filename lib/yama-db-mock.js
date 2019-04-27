'use strict'

const request = require('request')

function cloneO (toC) {
    return JSON.parse(JSON.stringify(toC));
}

function putNoExist(id) {
    return {
        'error': {
            'root_cause': [
                {
                    'type': 'document_missing_exception',
                    'reason': '[_doc]['+id+']: document missing',
                    'index_uuid': 'R6f_Vx82TVmNCx_fvM2wcw',
                    'shard': '0',
                    'index': 'yama'
                }
            ],
            'type': 'document_missing_exception',
            'reason': '[_doc][sharenabestgirl]: document missing',
            'index_uuid': 'R6f_Vx82TVmNCx_fvM2wcw',
            'shard': '0',
            'index': 'yama'
        },
        'status': 404
    };
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
        let result;
        this.playlists.filter((p) => {
            if (p._id === pId)
                result = p;
        });

        if (!result) return cb(null,putNoExist(pId));

        if (body.name) result._source['name'] = body.name;
        if (body.description) result._source['description'] = body.description;

        let playlist = cloneO(result)._source;

        return cb(null, {id:result._id, playlist});
    }

    putPlaylistMusic(pId, track, cb){
        this.getPlaylist(pId, (err, result) => {
            if(err)cb(err);

            let playlist = result._source;
            if (playlist['tracks'].indexOf(track) === -1) {
                playlist['tracks'].push(track);
                playlist['totalDuration'] += track['duration'];
            }

            this.playlists.filter((p,i) => {
                if (p._id === pId)
                    this.playlists[i]['_source'] = playlist;
            });

            let c = cloneO(playlist);
            c.id = pId;

            return cb(null, c);
        });
    }

    deletePlaylistMusic(pId, mId, cb){
        this.getPlaylist(pId, (err, result) => {
            if(err)cb(err);

            let playlist = result._source;
            playlist.tracks = playlist.tracks.filter((t) => {
                if( t.mbid !== mId )
                    return true;

                playlist.totalDuration -= t.duration;
                return false;
            });

            this.playlists.filter((p,i) => {
                if (p._id === pId)
                    this.playlists[i]['_source'] = playlist;
            });

            let c = cloneO(playlist);
            c.id = pId;

            return cb(null, c);
        });
    }

}

module.exports = YamaDB