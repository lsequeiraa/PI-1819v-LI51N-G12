class YamaService {
    constructor(yamaDB, lastfm) {
        this.yamaDB = yamaDB
        this.lastfm = lastfm
    }

    getArtist(query){
        return this.lastfm.getArtist(query)
            .then((result)=>{
                let array = result.results.artistmatches.artistmatches.artist
                let ret = {}
                array.forEach(c => {
                    ret.competitions.push({
                        'name':c.name,
                        'mbid': c.mbid,
                        'listeners':c.listeners,
                    })
                })
                return ret
            })
    }

    getArtistAlbums(arId, query) {

    }

    getAlbum(alId) {

    }

    postPlaylist(body) {

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