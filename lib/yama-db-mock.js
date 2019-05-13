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
        
    getPlaylists (){
        let c = [];
        this.playlists.forEach((p) => {
            c.push(cloneO(p));
        });


        return Promise.resolve({
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

    postPlaylist (body){

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

        return Promise.resolve({id:id, playlist});
    }
    
    getPlaylist(pId){
        let result = {};
        this.playlists.forEach((p) => {
            if (p._id == pId)
                result = p;
        });

        if (result === {})
            return Promise.resolve(result);

        let c = cloneO(result);
        c['found'] = true;

        return Promise.resolve(c);
    }
    
    deletePlaylist (pId) {
        let playlist = {};

        this.playlists = this.playlists.filter((p) => {
            if (p._id !== pId)
                return true;

            playlist = p;
            return false;
        });

        return Promise.resolve(playlist);
    }

    putPlaylist(pId, body) {
        let result;
        this.playlists.filter((p) => {
            if (p._id == pId)
                result = p;
        });

        if (!result) return Promise.resolve(putNoExist(pId));

        if (body.name) result._source['name'] = body.name;
        if (body.description) result._source['description'] = body.description;

        let playlist = cloneO(result)._source;

        return Promise.resolve({id:result._id, playlist});
    }

    putPlaylistMusic(pId, track){
        return this.getPlaylist(pId)
            .then((result)=> {
                let playlist = result._source;
                if (playlist['tracks'].indexOf(track) === -1) {
                    playlist['tracks'].push(track);
                    playlist['totalDuration'] += track['duration'];
                }

                this.playlists.filter((p,i) => {
                    if (p._id == pId)
                        this.playlists[i]['_source'] = playlist;
                });

                let c = cloneO(playlist);
                c.id = pId;

                return Promise.resolve(c);
            })
            .catch(()=>{return Promise.reject({code:404,message:'woops'})});
    }

    deletePlaylistMusic(pId, mId){
        return this.getPlaylist(pId)
            .then(result=>{
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

                return Promise.resolve(c);
            })
            .catch(err=>{return Promise.reject(err)});
    }

}

module.exports = YamaDB