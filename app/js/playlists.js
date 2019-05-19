'use strict'

const util = require('./util.js')
const Handlebars = require('handlebars/dist/handlebars')



module.exports = function showArtists(mainDiv,artist,name){
    mainDiv.innerHTML = require('../views/playlistsMainView.html')
    console.log('artist: '+artist+' name: '+name);
    util.toggleTab('nav#playlists')

}