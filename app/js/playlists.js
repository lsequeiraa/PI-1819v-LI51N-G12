'use strict'

const util = require('./util.js')
const Handlebars = require('handlebars/dist/handlebars')

module.exports = {
    addMusic
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
            body: JSON.stringify({artist:artist,name:trackName}),
            mode: 'cors'
        })
        .then((resp)=>{
            if(resp.ok) return util.showAlert('Music added to playlist','success')
            return Promise.reject(resp.statusText)
        })
        .catch((err) => util.showAlert(err,'danger'))
    
}