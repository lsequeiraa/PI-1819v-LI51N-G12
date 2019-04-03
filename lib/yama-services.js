'use strict'
const TreatError = require('./utils')

class YamaService {
    constructor(yamaDB, lastfm) {
        this.yamaDB = yamaDB
        this.lastfm = lastfm
    }

    getArtists(query){
        return this.lastfm.getArtists(query)
            .then((result)=>{

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
            .catch(
                (b)=>{
                    console.log(b)
                }
            )
    }

    getArtistTopAlbums(arId, query) {

        return this.lastfm.getArtistTopAlbums(arId,query)
            .then((result)=>{
                if(result['error']!=null){
                        
                    return Promise.reject(TreatError(result))
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
                return ret
            })

    }

    getAlbum(alId) {

        return this.lastfm.getAlbum(alId)
            .then((result)=>{
                if(result['error']!=null){
                        
                    return Promise.reject(TreatError(result))
                }

                let obj = result.album
                let ret = {
                    'Name':obj.name,
                    'Artist':obj.artist,
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

    }

    postPlaylist(body) {
        return this.yamaDB.postPlaylist(body)
        
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