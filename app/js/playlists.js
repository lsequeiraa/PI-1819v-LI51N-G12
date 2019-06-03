'use strict'

const util = require('./util.js')
const Handlebars = require('handlebars/dist/handlebars')
const playlistsResults = Handlebars.compile(require('../views/playlistsResults.hbs'))

module.exports = {
    mainView,
    addMusic
}

function mainView(mainDiv){
    mainDiv.innerHTML = require('../views/playlistsMainView.html')
    const divPlaylistsResults = document.getElementById('divPlaylistsResults')
    let inputName = document.getElementById('newPlayName')
    let inputDescription = document.getElementById('newPlayDescription')

    document
        .getElementById('newPlaylistButton')
        .addEventListener('click', postPlaylist)


    fetch('http://localhost:3000/playlists', {mode: 'cors'})
        .then((resp)=>{
            if(resp.ok) return resp.json()
            return Promise.reject(resp.statusText)
        })
        .then(playlists => {
            let view = playlistsResults(playlists.playlists)
            divPlaylistsResults.innerHTML = view
            /*var list= document.getElementsByName('button_artist')
            for (var i = 0; i < list.length; i++) {
                list[i].addEventListener('click', getArtistTopAlbums.bind(null,list[i].text))
            }*/
        })
        .catch((err) => util.showAlert(err,'danger'))

    function postPlaylist(){
        if(!inputName.value || !inputDescription.value) return util.showAlert('Please fill all the fields.','danger')
        fetch('http://localhost:3000/playlists',
            {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({name:inputName.value,description:inputDescription.value}),
                mode: 'cors'
            })
            .then((resp)=>{
                if(resp.ok) return util.showAlert("Playlist created successfully!",'success')
                return Promise.reject(resp.statusText)
            })
            .catch((err) => util.showAlert(err,'danger'))
    }
}

/*module.exports = function showArtists(mainDiv,artist,name){
    mainDiv.innerHTML = require('../views/playlistsMainView.html')
    console.log('artist: '+artist+' name: '+name);
    util.toggleTab('nav#playlists')

}*/

function addMusic(artist,trackName, playlistID){
    fetch('http://localhost:3000/playlists/'+playlistID+'/music',
        {
            method: 'PUT',
            body: JSON.stringify({artist:artist,name:trackName.normalize('NFD').replace(/[\u0300-\u036f]/g, '')}),
            mode: 'cors'
        })
        .then((resp)=>{
            if(resp.ok) return util.showAlert('Music added to playlist','success')
            return Promise.reject(resp.statusText)
        })
        .catch((err) => util.showAlert(err,'danger'))
    
}