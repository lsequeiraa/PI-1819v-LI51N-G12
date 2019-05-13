'use strict'
const TreatError = require('./utils')

class YamaService {
    constructor(yamaDB, lastfm) {
        this.yamaDB = yamaDB
        this.lastfm = lastfm
    }

    getArtists(query){

        return this.lastfm.getArtists(query)
            .then(result => {

                if(result['error']!=null){
                        
                    return Promise.reject(TreatError(result))
                }
                let array = result.results.artistmatches.artist
                let ret = {
                    'totalResults':result.results['opensearch:totalResults'],
                    'artists':[]
                }
                array.forEach(c => {

                    ret.artists.push({
                        'name':c.name,
                        'mbid': c.mbid,
                        'listeners':c.listeners,
                    })
                })
                return ret


            })
            .catch(err => { return Promise.reject(err)})

    }

    /*return this.lastfm.getArtists(query,(err, result)=>{
        if(err) return cb(err,null)
        if(result['error']!=null){
                
            return cb(TreatError(result),null)
        }
        let array = result.results.artistmatches.artist
        let ret = {
            'totalResults':result.results['opensearch:totalResults'],
            'artists':[]
        }
        array.forEach(c => {

            ret.artists.push({
                'name':c.name,
                'mbid': c.mbid,
                'listeners':c.listeners,
            })
        })
        return cb(null,ret)
    })*/
    

    getArtistTopAlbums(arId, query) {
        return this.lastfm.getArtistTopAlbums(arId,query)
            .then(result => {
                if(result['error']!=null){
                    return Promise.reject(TreatError(result))
                }
                let array = result.topalbums.album
                let ret = {
                    'totalResults':array.length,
                    'albums':[]
                }
                array.forEach(c => {

                    ret.albums.push({
                        'name':c.name,
                        'mbid': c.mbid,
                        'playcount':c.playcount,
                        'artist': {
                            'name':c.artist.name,
                            'mbid': c.artist.mbid
                        }
                    })
                })
                return ret
            })
            .catch(err =>{ return Promise.reject(err)})
        
        /* return this.lastfm.getArtistTopAlbums(arId,query, (err,result)=>{
            if(err) return cb(err,null)
            if(result['error']!=null){
                return cb(TreatError(result))
            }
            let array = result.topalbums.album
            let ret = {
                'totalResults':array.length,
                'albums':[]
            }
            array.forEach(c => {

                ret.albums.push({
                    'name':c.name,
                    'mbid': c.mbid,
                    'playcount':c.playcount,
                    'artist': {
                        'name':c.artist.name,
                        'mbid': c.artist.mbid
                    }
                })
            })
            return cb(null,ret)
        })*/
    }

    getAlbum(alId) {

        return this.lastfm.getAlbum(alId)
            .then(result => {
                if(result['error']!=null){ 
                    return Promise.reject(TreatError(result),null)
                }
                let obj = result.album
                let ret = {
                    'name':obj.name,
                    'artist':obj.artist,
                    'mbid':obj.mbid,
                    'listeners':obj.listeners,
                    'playcount':obj.playcount,
                    'tracks':[]
                }
                obj.tracks.track.forEach(c => {
                    ret.tracks.push({
                        'name':c.name,
                        'duration':c.duration
                    })
                })
                return ret
            })
            .catch(err => { return Promise.reject(err)})
        /*
        return this.lastfm.getAlbum(alId, (err,result)=>{
            if(err) return cb(err,null)
            if(result['error']!=null){ 
                return cb(TreatError(result),null)
            }
            let obj = result.album
            let ret = {
                'name':obj.name,
                'artist':obj.artist,
                'mbid':obj.mbid,
                'listeners':obj.listeners,
                'playcount':obj.playcount,
                'tracks':[]
            }
            obj.tracks.track.forEach(c => {
                ret.tracks.push({
                    'name':c.name,
                    'duration':c.duration
                })
            })
            return cb(null,ret)
        })*/
    }
    
    getPlaylists() {
        return this.yamaDB.getPlaylists()
            .then(result => {
                let playlists = result['hits']['hits']
                playlists.forEach((playlist) => {
                    playlist.id = playlist._id
                    playlist.name = playlist._source.name
                    playlist.description = playlist._source.description
                    playlist.totalDuration = playlist._source.totalDuration
                    playlist.tracks = playlist._source.tracks
                    delete playlist._index
                    delete playlist._type
                    delete playlist._id
                    delete playlist._score
                    delete playlist._source
                })
                return {totalResults: result['hits']['total']['value'], playlists}

            })
            .catch(err=> { return Promise.reject(err)})
        /*
        return this.yamaDB.getPlaylists((err,result)=>{
            if(err) return cb(err,null)
            let playlists = result['hits']['hits']
            playlists.forEach((playlist) => {
                playlist.id = playlist._id
                playlist.name = playlist._source.name
                playlist.description = playlist._source.description
                playlist.totalDuration = playlist._source.totalDuration
                playlist.tracks = playlist._source.tracks
                delete playlist._index
                delete playlist._type
                delete playlist._id
                delete playlist._score
                delete playlist._source
            });
            return cb(null, {totalResults: result['hits']['total']['value'], playlists});
        })*/
    }

    postPlaylist(body) {
        if (!body || !body.name || !body.description) return Promise.reject({code:400, message:'No body.'})
        return this.yamaDB.postPlaylist(body)
            .then(result => {

                return {
                    id: result.id,
                    name: result.playlist.name,
                    description: result.playlist.description,
                    totalDuration: result.playlist.totalDuration,
                    tracks: result.playlist.tracks
                }})
            .catch(err =>{ return Promise.reject(err)})
        /*  if (!body || !body.name || !body.description) return cb({code:400, message:'No body.'})
        return this.yamaDB.postPlaylist(body,(err,result)=>{
            if(err) return cb(err,null)
            return cb(null, 
                {
                    id: result.id,
                    name: result.playlist.name,
                    description: result.playlist.description,
                    totalDuration: result.playlist.totalDuration,
                    tracks: result.playlist.tracks
                })
        })*/
        
    }

    putPlaylist(pId, body) {
        return this.yamaDB.putPlaylist(pId, body)
            .then(result =>{
                if (result.error) return Promise.reject({code:404, message:"Not found"})
                let ret = {id:result.id}
                if (result.playlist.name)  ret.name = result.playlist['name']
                if (result.playlist.description) ret.description = result.playlist['description']
                return ret

            })
            .catch(err => { return Promise.reject(err)})

        /* return this.yamaDB.putPlaylist(pId, body, (err,result) => {
            if(err) return cb(err,null);
            if (result.error) return cb({code:404, message:"Not found"});
            let ret = {id:result.id};
            if (result.playlist.name)  ret.name = result.playlist['name'];
            if (result.playlist.description) ret.description = result.playlist['description'];

            return cb(null, ret);
        })*/
    }


    getPlaylist(pId) {

        return this.yamaDB.getPlaylist(pId)
            .then(result =>{
                if(!result.found) return Promise.reject({code:404, message:"Not found"})
                let playlist= {
                    'id':result._id,
                    'name':result._source.name,
                    'description':result._source.description,
                    'totalDuration':result._source.totalDuration,
                    'tracks': result._source.tracks
                }
                return playlist

            })
            .catch(err => { return Promise.reject(err)})

        /*return this.yamaDB.getPlaylist(pId,(err,result)=>{
            if(err) return cb(err,null)
            if(!result.found) return cb({code:404, message:"Not found"})
            let playlist= {
                'id':result._id,
                'name':result._source.name,
                'description':result._source.description,
                'totalDuration':result._source.totalDuration,
                'tracks': result._source.tracks
            }
            
            return cb(null, playlist)
        })*/


    }

    putPlaylistMusic(pId, body) {
        let yama = this.yamaDB
        return this.lastfm.getTrack(body)
            .then(result => {
            
                let track = {};
                track['mbid'] = result.track.mbid;    //albumid
                track['name'] = result.track.name;
                track['duration'] = parseInt(result.track.duration); //milliseconds
                return yama.putPlaylistMusic(pId, track)
                    .then(result => result)
                    .catch(err => { console.log(err.status);return Promise.reject({code:err.status})})

            })
            .catch(err=> { return Promise.reject(err)})

        /*return this.lastfm.getTrack(body, function(err, result) {
            if (err) return cb(err);
            
           // let trackToAdd = result.tracks.indexOf(body.name)

            let track = {};
            track['mbid'] = result.track.mbid;    //albumid
            track['name'] = result.track.name;
            track['duration'] = parseInt(result.track.duration); //milliseconds

            return yama.putPlaylistMusic(pId, track,(err,result)=>{
                if(err) return cb(err)
                return cb(null,result)
            })
        })*/
    }

    deletePlaylistMusic(pId, mId) {
        return this.yamaDB.deletePlaylistMusic(pId, mId)
            .then(result => result)
            .catch(err =>{ return Promise.reject(err)})

        /*return this.yamaDB.deletePlaylistMusic(pId, mId, (err, result)=>{
            if(err) return cb(err, null);
            return cb(null, result);
        })*/
    }

    deletePlaylist(pId) {
        return this.yamaDB.deletePlaylist(pId)
            .then(result => { 
                return {
                    id: result._id,
                    result: result.result
                }
            })
            .catch(err => { return Promise.reject(err)})

        /*return this.yamaDB.deletePlaylist(pId, (err, result) => {
            if (err) return cb(err, null);
            return cb(null,
                {
                    id: result._id,
                    result: result.result
                })
        })*/
    }
}

module.exports = YamaService