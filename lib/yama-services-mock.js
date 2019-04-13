'use strict'

var artists = {
    'totalResults':'61201',
    'artist':[
        {
            name: 'Cher',
            mbid: 'bfcc6d75-a6a5-4bc6-8282-47aec8531818',
            listeners:'629140'
        }
    ]
}

var albums = {
    'totalalbums': '50',
    'albums': [
        {
            'name': 'Believe',
            'mbid': '63b3a8ca-26f2-4e2b-b867-647a6ec2bebd',
            'playcount': '2362854',
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

var playlists = []
 

module.exports = class YamaServicesMock {
    constructor(yamaDB, lastfm) {
        this.yamaDB = yamaDB
        this.lastfm = lastfm
    }



    getArtists(query,cb){
        if(query.artist==='Cher') return cb(null,artists)
        cb({code:400, message:'Name is not Cher'})
    }


    getArtistTopAlbums(arId, query,cb){
        if(arId!=='bfcc6d75-a6a5-4bc6-8282-47aec8531818' || query.artist==='Cher') return cb(null,albums)
        cb({code:400, message:'Incorrect ID or name'})
    }

    getAlbum(alId,cb){
        if(alId!=='63b3a8ca-26f2-4e2b-b867-647a6ec2bebd') return cb(null,album)
        cb({code:400, message:'Incorrect ID '})
    }

    getPlaylists(cb){
        cb(null,{
            totalResults:playlists.length,
            playlists:{
                playlists
            }
        })
    }

    postPlaylist(body,cb){
        let id = playlists.length
        playlists.push({
            'id': id,
            'name': body.name,
            'description': body.description,
            'totalDuration': 0,
            'tracks': []
        })
        return cb(null, playlists[id])
    }

    putPlaylist(pId, body, cb){
        let playlist = playlists.find((playlist)=>playlist.id==pId)
        if(playlist!=null){
            playlist.name = body.name
            playlist.description = body.description
            return cb(null,playlist)
        }
        cb({code:400, message:'Incorrect ID '})
    }

    getPlaylist(pId,cb){

    }

    putPlaylistMusic(pId, body, cb){

    }

    deletePlaylistMusic(pId, mId, cb){

    }

    deletePlaylist(pId, cb){

    }

}