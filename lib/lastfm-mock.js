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


module.exports = class lastfmMock{
    
    
    
    getArtists(query,cb){
        if(query && query.artist==='Cher') return cb(null,artists)
        cb({code:400, message:'Name is not Cher'})
    }

    getArtistTopAlbums(arId, query,cb){
        if(arId==='bfcc6d75-a6a5-4bc6-8282-47aec8531818' || (query && query.artist==='Cher')) return cb(null,albums)
        cb({code:400, message:'Incorrect ID or name'})
    }

    getAlbum(alId,cb){
        if(alId==='63b3a8ca-26f2-4e2b-b867-647a6ec2bebd') return cb(null,album)
        cb({code:400, message:'Incorrect ID '})
    }



}