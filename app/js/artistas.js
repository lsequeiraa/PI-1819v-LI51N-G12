'use strict'

const util = require('./util.js')
const Handlebars = require('handlebars/dist/handlebars')
const artistSearchResults = Handlebars.compile(require('../views/artistasSearchResult.hbs'))
const topAlbumsSearchResult = Handlebars.compile(require('../views/topAlbumsSearchResult.hbs'))
const albumInfoResult = Handlebars.compile(require('../views/albumInfoResult.hbs'))


module.exports = function showArtists(){
    let mainDiv = document.getElementById('divMain')
    mainDiv.innerHTML = require('../views/artistasMainView.html')
    let input = document.getElementById('inputArtistasName')
    const divArtistasResults = document.getElementById('divArtistasResults')
    document
        .getElementById('artistasNameSearchButton')
        .addEventListener('click', getArtists)

    function getArtists(){
        if(input.value != '')
            fetch('http://localhost:3000/artist?artist='+input.value+'&limit=50', {mode: 'cors'})
                .then((resp)=>{
                    if(resp.ok) return resp.json()
                    return Promise.reject(resp.statusText)
                })
                .then(artistas => {
                    let view = artistSearchResults(artistas.artists)
                    divArtistasResults.innerHTML = view
                    var list= document.getElementsByName('button_artist')
                    for (var i = 0; i < list.length; i++) {
                        list[i].addEventListener('click', getArtistTopAlbums.bind(null,list[i].text))
                    }
                })
                .catch((err) => util.showAlert(err,'danger'))
    }

    function getArtistTopAlbums(mbid){
        fetch('http://localhost:3000/artist/'+mbid+'?limit=50', {mode: 'cors'})
            .then((resp)=>{
                if(resp.ok) return resp.json()
                return Promise.reject(resp.statusText)
            })
            .then(albums => {
                albums.artist = albums.albums[0].artist.name
                let view = topAlbumsSearchResult(albums)
                divArtistasResults.innerHTML = view
                var list= document.getElementsByName('button_album')
                for (var i = 0; i < list.length; i++) {
                    list[i].addEventListener('click', getAlbumInfo.bind(null,list[i].text, mbid))
                }
            })
            .catch((err) => util.showAlert(err,'danger'))
    }

    function getAlbumInfo(mbid, artistMBID){
        Promise.all([
            fetch('http://localhost:3000/album/'+mbid+'?limit=50', {mode: 'cors'}),
            fetch('http://localhost:3000/playlists')
        ])
            .then((array)=>{
                let ok = true;
                let text = '';
                array.forEach(resp => {
                    if(!resp.ok){
                        ok = false;
                        text = resp.statusText
                    }
                });
                if(!ok) return Promise.reject(text)   
                return array  
            })
            .then(async([aa, bb]) => {
                const a = await aa.json();
                const b = await bb.json();
                return [a, b]
            })
            .then(array => {
                let album = {album:array[0]}
                album.album.playlists = array[1]
                let view = albumInfoResult(album.album)
                divArtistasResults.innerHTML = view
                let artistButton = document.getElementsByName('button_artist')
                artistButton[0].addEventListener('click', getArtistTopAlbums.bind(null,artistMBID))
                var list= document.getElementsByName('button_track')
                let playlistPutMusic = require('./playlists.js').addMusic
                for (var i = 0; i < list.length; i++) {
                    list[i].addEventListener('click', playlistPutMusic.bind(
                        null,album.album.artist,
                        list[i].attributes.trackName.value,
                        list[i].attributes.playlistID.value))
                }
            })
            .catch((err) => util.showAlert(err,'danger'))
    }
}