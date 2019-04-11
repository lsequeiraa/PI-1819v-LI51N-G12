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
    
    getPlaylists(cb) {
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
            })
            return cb(null, playlists)
        })
    }

    postPlaylist(body,cb) {
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
        })
        
    }

    putPlaylist(pId, body) {

    }


    getPlaylist(pId) {

    }

    putPlaylistMusic(pId, mId, body) {

    }

    deletePlaylist(pId, mId) {

    }
}

module.exports = YamaService