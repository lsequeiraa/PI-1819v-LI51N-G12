'use strict'

const rp = require('request-promise')

class YamaDB {
    constructor(baseUrl = 'http://localhost:9200/', dbIndex = 'yama') {
        this.dbUrl = baseUrl + dbIndex + '/'
    }
        
    getPlaylists (uId){
        return rp({
            method: 'GET',
            url: this.dbUrl+'_search?q=user:'+uId,
            encoding: 'utf8',
            json: true
        })
            .then(data => data)
            .catch(err => { return Promise.reject({code:err.statusCode})})
    }

    postPlaylist (uId, body){
        let url = this.dbUrl + '_doc';
        let playlist = {
            'user' : uId,
            'name' : body.name,
            'description' : body.description,
            'totalDuration' : 0,
            'tracks' : []
        };

        return rp({
            method: 'POST',
            url: url,
            body: playlist,
            json: true
        })
            .then(data => {return {id: data._id,playlist}})
            .catch(err => { return Promise.reject({code:err.statusCode})})
    }
    
    getPlaylist(pId){
        return rp({
            method: 'GET',
            url: this.dbUrl+`_doc/${pId}`,
            encoding: 'utf8',
            json: true
        })
            .then(data => data)
            .catch(err => { return Promise.reject({code:err.statusCode})})
    }
    
    deletePlaylist (pId) {
        let url = this.dbUrl + '_doc/' + pId;
        return rp({
            method: 'DELETE',
            url:url,
            json:true
        })
            .then(data => data)
            .catch(err => { return Promise.reject({code:err.statusCode})})
    }

    putPlaylist(pId, body) {
        let url = this.dbUrl + '_update/' + pId;
        let playlist = {};
        if (body.name) playlist['name'] = body.name;
        if (body.description) playlist['description'] = body.description;

        return rp({
            method: 'POST',
            url: url,
            body: {doc: playlist},
            json:true
        })
            .then(data => {
                if(data.error) return Promise.reject({code:data.status, message:'Document not found'})
                return {id: data._id, playlist}
            })
            .catch(err => {return Promise.reject({code:err.statusCode, message:'Error'})})
    }

    putPlaylistMusic(pId, track){
        let toReturn = {};
        return this.getPlaylist(pId)
            .then(data => {
                if(!data.found)
                    return Promise.reject({code:404, message:'Not Found'})
                toReturn = data._source;
                if (toReturn['tracks'].indexOf(track) === -1) {
                    toReturn['tracks'].push(track);
                    toReturn['totalDuration'] += track['duration'];
                }
                return rp({
                    method: 'PUT',
                    url: this.dbUrl + '_doc/' + pId,
                    body: toReturn,
                    json: true
                })
                    .then(() => {
                        toReturn.id = pId;
                        return toReturn;
                    })
                    .catch(err => { return Promise.reject({code:err.statusCode})})
            })
            .catch(err => { return Promise.reject({code:err.statusCode})})
            
    }


    deletePlaylistMusic(pId, mId){
        let toReturn = {}
        return this.getPlaylist(pId)
            .then(data =>{
                if(!data.found)
                    return Promise.reject({code:404, message:'Not Found'})
                toReturn = data._source;
                toReturn.tracks = toReturn.tracks.filter((t) => {
                    if( t.mbid !== mId )
                        return true;

                    toReturn.totalDuration -= t.duration;
                    return false;
                });
                return toReturn;
            })
            .catch(err => { return Promise.reject({code:err.statusCode})})
            .then((result)=>rp({
                method: 'PUT',
                url: this.dbUrl + '_doc/' + pId,
                body: result,
                json: true
            }))
            .then(() => {
                toReturn.id = pId;
                return toReturn;
            })
            .catch(err => { return Promise.reject({code:err.statusCode})})
    }

    
}

module.exports = YamaDB;