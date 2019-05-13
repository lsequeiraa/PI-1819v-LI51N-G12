'use strict'

var artists = {
    'totalResults':'61201',
    'artists':[
        {
            name: 'Cher',
            mbid: 'bfcc6d75-a6a5-4bc6-8282-47aec8531818',
            listeners:'629140'
        },
        {
            name: 'Cheryl Cole',
            mbid: '2d499150-1c42-4ffb-a90c-1cc635519d33',
            listeners: '629086',
        }
    ]
}

var albums = {
    'totalResults': '50',
    'albums': [
        {
            'name': 'Believe',
            'mbid': '63b3a8ca-26f2-4e2b-b867-647a6ec2bebd',
            'playcount': '2362854',
            'artist': {
                'name': 'Cher',
                'mbid': 'bfcc6d75-a6a5-4bc6-8282-47aec8531818'
            }
        },
        {
            'name': 'The Very Best of Cher',
            'playcount': '1681089',
            'mbid': 'a7e2dad7-e733-4bee-9db1-b31e3183eaf5',
            'artist': {
                'name': 'Cher',
                'mbid': 'bfcc6d75-a6a5-4bc6-8282-47aec8531818'
            }
        }
    ]
}

var album =
{
    'name': 'Believe',
    'artist': 'Cher',
    'mbid': '63b3a8ca-26f2-4e2b-b867-647a6ec2bebd',
    'listeners': '374270',
    'playcount': '2371607',
    'tracks': [
        {
            'name': 'Believe',
            'duration': '240'
        },
        {
            'name': 'The Power',
            'duration': '236'
        },
        {
            'name': 'Runaway',
            'duration': '286'
        },
        {
            'name': 'All or Nothing',
            'duration': '238'
        },
        {
            'name': 'Strong Enough',
            'duration': '223'
        },
        {
            'name': 'Dov\'e L\'amore',
            'duration': '258'
        },
        {
            'name': 'Takin\' Back My Heart',
            'duration': '272'
        },
        {
            'name': 'Taxi Taxi',
            'duration': '304'
        },
        {
            'name': 'Love Is the Groove',
            'duration': '271'
        },
        {
            'name': 'We All Sleep Alone',
            'duration': '233'
        }
    ]
}

var track =
{
    'name': 'Believe',
    'mbid': '32ca187e-ee25-4f18-b7d0-3b6713f24635',
    'duration': 240000,
} 

var currentID = 0
var playlists = []
 

module.exports = class YamaServicesMock {
    constructor(yamaDB, lastfm) {
        this.yamaDB = yamaDB
        this.lastfm = lastfm
    }



    getArtists(query){
        if(query && query.artist==='Cher') return Promise.resolve(artists)
        return Promise.reject({code:400, message:'No artist name specified.'})
    }


    getArtistTopAlbums(arId, query){
        if(arId==='bfcc6d75-a6a5-4bc6-8282-47aec8531818' || (query && query.artist==='Cher')) return Promise.resolve(albums)
        return Promise.reject({code:400, message:'Incorrect ID or name'})
    }

    getAlbum(alId){
        if(alId==='63b3a8ca-26f2-4e2b-b867-647a6ec2bebd') return Promise.resolve(album)
        return Promise.reject({code:400, message:'Incorrect ID '})
    }

    getPlaylists(){
        return Promise.resolve({
            'totalResults': playlists.length,
            'playlists': playlists
            
        })
    }

    postPlaylist(body){
        if(!body.name || !body.description) return Promise.reject({code:400,message:'Body is missing params'})
        let id = ++currentID
        playlists.push({
            'id': id,
            'name': body.name,
            'description': body.description,
            'totalDuration': 0,
            'tracks': []
        })
        return Promise.resolve(playlists[playlists.length-1])
    }

    putPlaylist(pId, body){
        let playlist = playlists.find((playlist)=>playlist.id==pId)
        if(playlist!=null){
            playlist.name = body.name
            playlist.description = body.description
            return Promise.resolve(playlist)
        }
        return Promise.reject({code:404, message:'Playlist not found'})
    }

    getPlaylist(pId){
        if(!pId) return Promise.reject({code:400, message:'No playlist specified'})
        let retPlaylist
        playlists.forEach(playlist => {
            if(playlist.id == pId)
                retPlaylist = playlist
        })
        if(retPlaylist) return Promise.resolve(retPlaylist)
        return Promise.reject({code:404, message:'Playlist not found'})
    }

    putPlaylistMusic(pId, body){
        if(body.artist !== album.artist) return Promise.reject({code:400, message:'No artist name specified.'})
        if(track.name != body.name) return Promise.reject({code:404, message:'No track with such name found'})
        let playlist = playlists.find((playlist)=>playlist.id==pId)
        if(playlist!=null){
            playlist.tracks.push(track)
            playlist.totalDuration += track.duration //+ parseInt(playlist.totalDuration)
            return Promise.resolve(playlist)
        }
        return Promise.reject({code:400, message:'Incorrect ID '})
    }

    deletePlaylistMusic(pId, mId){
        let playlist = playlists.findIndex((playlist)=>playlist.id == pId)
        if(playlist==-1) return Promise.reject({code:404, message:'No playlist with that id found'})
        let idx = playlists[playlist].tracks.findIndex((track)=>track.mbid == mId)
        if(idx==-1) return Promise.reject({code:404, message:'No track with that id found'})
        playlists[playlist].totalDuration -= playlists[playlist].tracks[idx].duration
        var removed = playlists[playlist].tracks.splice(idx, 1)
        return Promise.resolve(playlists[playlist])
    }

    deletePlaylist(pId){
        let idx = playlists.findIndex((playlist)=>playlist.id == pId)
        if(idx == -1) return Promise.reject({code:404, message:'Playlist not found'})
        var removed = playlists.splice(idx, 1)
        return Promise.resolve(null, playlists)
    }

}