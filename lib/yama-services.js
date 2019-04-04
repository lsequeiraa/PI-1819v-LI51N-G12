'use strict'
const TreatError = require('./utils')

class YamaService {
    constructor(yamaDB, lastfm) {
        this.yamaDB = yamaDB
        this.lastfm = lastfm
    }

    getArtists(query,cb){
        return this.lastfm.getArtists(query,(err, result)=>{
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
        })
    }

    getArtistTopAlbums(arId, query,cb) {

        return this.lastfm.getArtistTopAlbums(arId,query, (err,result)=>{
            if(err) return cb(err,null)
            if(result['error']!=null){
                return cb(TreatError(result))
            }
            let array = result.topalbums.album
            let ret = {
                'totalalbums':array.length,
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
        })
    }

    getAlbum(alId,cb) {
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
        })
    }

    postPlaylist(body,cb) {
        return this.yamaDB.postPlaylist(body,(err,data)=>{
            if(err) return cb(err,null)
        })
        
    }

    putPlaylist(pId, body) {

    }

    getPlaylists() {

    }

    getPlaylist(pId) {

    }

    putPlaylistMusic(pId, mId, body) {

    }

    deletePlaylist(pId, mId) {

    }
}

module.exports = YamaService