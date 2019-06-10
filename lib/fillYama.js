'use strict';

let services = new (require('./../lib/yama-services.js'))(new (require('./../lib/yama-db.js')), require('./../lib/lastfm.js'));
let authService = new (require('./yama-auth-service.js'))(new (require('./yama-auth-db.js')));

let userId1;
let userId2;

authService.postUser({username: 'G12', password: 'PI'})
    .then(res => {
        userId1 = res.id;
        return services.postPlaylist(userId1,  {
            name: 'Playlist1',
            description: 'Description1'
        })
    })
    .then((res) => {
        return services.putPlaylistMusic(res.id, {
            artist: 'Cher',
            name: 'Believe'
        })
    })
    .then(() => {
        return services.postPlaylist(userId1,  {
            name: 'Playlist1',
            description: 'Description1'
        })
    });


authService.postUser({username: 'PI', password: 'G12'})
    .then(res => {
        userId2 = res.id;
        return services.postPlaylist(userId2,  {
            name: 'Playlist3',
            description: 'Description3'
        })
    })
    .then((res) => {
        return services.putPlaylistMusic(res.id, {
            artist: 'Cher',
            name: 'Believe'
        })
    })
    .then(() => {
        return services.postPlaylist(userId2,  {
            name: 'Playlist4',
            description: 'Description4'
        })
    });