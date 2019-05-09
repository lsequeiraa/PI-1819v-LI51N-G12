'use strict'

//const request = require('request')
const rp = require('request-promise')

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
        
    getPlaylists (){
        //let dataF = ''
        return rp({
            method: 'GET',
            url: this.dbUrl+'_search',
            encoding: 'utf8',
            json: true
        })
            .then(data => data)
            .catch(err => { return Promise.reject(err)})
            /*.on('error', err => cb(err))
            .on('data', data => dataF += data)
            .on('end', () => cb(null,JSON.parse(dataF)))*/
    }

    postPlaylist (body){
        let url = this.dbUrl + '_doc'

        
        //let dataF = ''

        let playlist = {
            'name' : body.name,
            'description' : body.description,
            'totalDuration' : 0,
            'tracks' : []
        }

        return rp({
            method: 'POST',
            url: url,
            body: playlist,
            json: true
        })
            .then(data => {return {id: data._id,playlist}})
            .catch(err => { return Promise.reject(err)})
            /*.on('error', err => cb(err))
            .on('data',data => dataF += data)
            .on('end', () => cb(null,{id: JSON.parse(dataF)._id, playlist}))*/

    }
    
    getPlaylist(pid){

        //let dataF = ''
        return rp({
            method: 'GET',
            url: this.dbUrl+`_doc/${pid}`,
            encoding: 'utf8',
            json: true
        })
            .then(data => data)
            .catch(err => { return Promise.reject(err)})
            /*.on('error', err => cb(err))
            .on('data', data => dataF += data)
            .on('end', () => cb(null,JSON.parse(dataF)))*/
    }
    
    deletePlaylist (pId) {
        let url = this.dbUrl + '_doc/' + pId;

        //let dataF = '';

        return rp({
            method: 'DELETE',
            url:url,
            json:true
        })
            .then(data => data)
            .catch(err => { return Promise.reject(err)})
            /*.on('error', err => cb(err))
            .on('data',data => dataF += data)
            .on('end', () => cb(null,JSON.parse(dataF)))*/
    }

    putPlaylist(pId, body) {
        let url = this.dbUrl + '_update/' + pId;

        //let dataF = '';

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
            .catch(err => { return Promise.reject(err)})
            /*.on('error', err => cb(err))
            .on('data',data => dataF += data)
            .on('end', () =>{
                let parsed = JSON.parse(dataF)
                if(parsed.error) return cb({code:parsed.status, message:'Document not found'})
                cb(null,{id: parsed._id, playlist})
            })*/
    }

    putPlaylistMusic(pId, track){
        let toReturn = {};

        /*this.getPlaylist(pId,(err,result)=>{
            if(err) return cb(err);
            if(!result.found)
                return cb({code:404, message:'Not Found'})
            toReturn = result._source;
            if (toReturn['tracks'].indexOf(track) === -1) {
                toReturn['tracks'].push(track);
                toReturn['totalDuration'] += track['duration'];
            }

            let dataF = '';

            return request.put({
                url: this.dbUrl + '_doc/' + pId,
                body: toReturn,
                json: true
            })
                .on('error', err => cb(err))
                .on('data', data => dataF += data)
                .on('end', () => {
                    //if (error || response.statusCode !== 200) cb(err);
                    toReturn.id = pId;
                    cb(null, toReturn);
                });
        })*/
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
                .catch(err => { return Promise.reject(err)})
            })
            .catch(err => { return Promise.reject(err)})
            
    }


    deletePlaylistMusic(pId, mId){
        let toReturn = {}
        /*this.getPlaylist(pId,(err,result)=>{
            if(err) return cb(err);
            if(!result.found)
                return cb({code:404, message:'Not Found'})
            toReturn = result._source;
            toReturn.tracks = toReturn.tracks.filter((t) => {
                if( t.mbid !== mId )
                    return true;

                toReturn.totalDuration -= t.duration;
                return false;
            });

            let dataF = ''

            return request.put({
                url: this.dbUrl + '_doc/' + pId,
                body: toReturn,
                json: true
            })
                .on('error', err => cb(err))
                .on('data', data => dataF += data)
                .on('end', () => {
                    toReturn.id = pId;
                    cb(null, toReturn)
                });

        })*/

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
            })
            .catch(err => { return Promise.reject(err)})
            .then(rp({
                method: 'PUT',
                url: this.dbUrl + '_doc/' + pId,
                body: toReturn,
                json: true
            }))
            .then(() => {
                toReturn.id = pId;
                return toReturn;
            })
            .catch(err => { return Promise.reject(err)})
    }

    
}

module.exports = YamaDB