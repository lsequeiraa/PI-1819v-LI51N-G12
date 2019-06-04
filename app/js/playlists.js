'use strict'

const util = require('./util.js')
const Handlebars = require('handlebars/dist/handlebars')
const playlistsResults = Handlebars.compile(require('../views/playlistsResults.hbs'))
const playlistView = Handlebars.compile(require('../views/playlistSingleViewModal.hbs'))

module.exports = {
    mainView,
    addMusic
}

function mainView(mainDiv){
    mainDiv.innerHTML = require('../views/playlistsMainView.html')
    const divPlaylistsResults = document.getElementById('divPlaylistsResults')
    const divPlaylistModal = document.getElementById('divPlaylistModal')
    let inputName = document.getElementById('newPlayName')
    let inputDescription = document.getElementById('newPlayDescription')

    document
        .getElementById('newPlaylistButton')
        .addEventListener('click', postPlaylist)

    getPlaylists()

    function getPlaylists(){
        fetch('http://localhost:3000/playlists', {mode: 'cors'})
            .then((resp)=>{
                if(resp.ok) return resp.json()
                return Promise.reject(resp.statusText)
            })
            .then(playlists => {
                let view = playlistsResults(playlists.playlists)
                divPlaylistsResults.innerHTML = view
                var viewList= document.getElementsByName('button_view_playlist')
                for (let i = 0; i < viewList.length; i++) {
                    viewList[i].addEventListener('click', getPlaylist.bind(null,playlists.playlists[i].id))
                }
                var updateList = document.getElementsByName('button_update_playlist')
                var nameUpdateList = document.getElementsByName('updatePlayName')
                var descriptionUpdateList = document.getElementsByName('updatePlayDescription')
                for (let i = 0; i < updateList.length; i++) {
                    updateList[i].addEventListener('click', putPlaylist.bind(null,playlists.playlists[i].id, nameUpdateList[i], descriptionUpdateList[i]))
                }
            })
            .catch((err) => util.showAlert(err,'danger'))
    }

    function getPlaylist(playlistID){
        fetch('http://localhost:3000/playlists/'+playlistID, {mode: 'cors'})
            .then((resp)=>{
                if(resp.ok) return resp.json()
                return Promise.reject(resp.statusText)
            })
            .then(playlist => {
                let view = playlistView(playlist)
                divPlaylistModal.innerHTML = view
                var modal = $('#playlistModal')
                modal.modal('show')
                var deleteList = document.getElementsByName('button_Delete_Music')
                for (let i = 0; i < deleteList.length; i++) {
                    deleteList[i].addEventListener('click', deleteMusic.bind(null,playlistID,playlist.tracks[i].mbid,modal))
                }
            })
    }

    function deleteMusic(playlistID,mbid,modal){
        fetch('http://localhost:3000/playlists/'+playlistID+'/music/'+mbid,
            {
                method: 'DELETE',
                mode: 'cors'
            })
            .then((resp)=>{
                if(resp.ok)  {
                    util.showAlert('Music successfully deleted!','success')
                    return setTimeout(()=>{
                        modal.modal('hide')
                        getPlaylists()
                        getPlaylist(playlistID)
                        //setTimeout(()=>{getPlaylists; setTimeout(getPlaylist.bind(null,playlistID))},1000)
                        //getPlaylist(playlistID)
                    },1000)
                }
                return Promise.reject(resp.statusText)
            })
            .catch((err) => util.showAlert(err,'danger'))   
    }

    function putPlaylist(playlistID, newName, newDescription){
        if(!newName.value || !newDescription.value) return util.showAlert('Please fill all the fields.','danger')
        fetch('http://localhost:3000/playlists/'+playlistID,
            {
                method: 'PUT',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({name:newName.value,description:newDescription.value}),
                mode: 'cors'
            })
            .then((resp)=>{
                if(resp.ok)  {
                    util.showAlert('Playlist successfully edited!','success')
                    return setTimeout(getPlaylists,1000)
                }
                return Promise.reject(resp.statusText)
            })
            .catch((err) => util.showAlert(err,'danger'))   
    }

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
                if(resp.ok)  {
                    util.showAlert("Playlist created successfully!",'success')
                    return setTimeout(getPlaylists,1000)
                }
                return Promise.reject(resp.statusText)
            })
            .catch((err) => util.showAlert(err,'danger'))
    }
}

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