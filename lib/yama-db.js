'use strict'

const request = require('request')

class YamaDB {
    constructor(baseUrl = 'http://localhost:9200/', dbIndex = 'yama') {
        //this.baseUrl = baseUrl;
        //this.dbIndex = dbIndex;

        this.dbUrl = baseUrl + dbIndex + '/'

        /*request.head(this.dbUrl)
            .on('response', (resp) => {
                if (resp.statusCode !== 200) throw new Error(`Index ${dbIndex} not available.`)
            })*/
    }
        
    getPlaylists (cb){
        let dataF = ''
        return request.get({
            uri: this.dbUrl+'_doc/_search',
            encoding: 'utf8'
        })
            .on('error', err => cb(err))
            .on('data', data => dataF += data)
            .on('end', () => cb(null,JSON.parse(dataF)))
    }

    postPlaylist (body, cb){
        let url = this.dbUrl + '_doc'

        
        let dataF = ''

        let playlist = {
            'name' : body.name,
            'description' : body.description,
            'totalDuration' : 0,
            'tracks' : []
        }

        return request.post({
            'url':url,
            'body':playlist,
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
    
    getPlaylist(pid,cb){

        let dataF = ''
        return request.get({
            uri: this.dbUrl+`_doc/${pid}`,
            encoding: 'utf8'
        })
            .on('error', err => cb(err))
            .on('data', data => dataF += data)
            .on('end', () => cb(null,JSON.parse(dataF)))
    }
    
    deletePlaylist (pId, cb) {
        let url = this.dbUrl + '_doc/' + pId;

        let dataF = '';

        return request.delete({
            'url':url,
            'json':true
        })
            .on('error', err => cb(err))
            .on('data',data => dataF += data)
            .on('end', () => cb(null,JSON.parse(dataF)))
    }

    
}

module.exports = YamaDB