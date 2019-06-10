'use strict'

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

const util = require('./util.js')
let mainView = require('../views/main.html')

document.body.innerHTML = mainView
const divTitle = document.getElementById('h1Title')
let number = Math.floor(Math.random() * 100)
if(number <= 25) joke()
async function joke(){
    divTitle.innerHTML = 'FOCA - Yet Another Music Application'
    setTimeout(function() {
        divTitle.innerHTML = 'YAMA - Yet Another Music Application'
    }, 700)
}

const divMain = document.getElementById('divMain')
util.showLogin()
    .then(() => {
        window.onload = showView
        window.onhashchange = showView
    })
    .catch((err) => utils.showAlert(err,'danger'))

const showView = async () => {
    const [view, ...params] = window.location.hash.split('/')
    switch (view) {
    case '#welcome':
        util.toggleTab("nav#welcome")
        divMain.innerHTML = require('../views/mainView.html')
        break
    case '#artists':
        util.toggleTab("nav#artists")
        require('./artistas.js')()
        break
    case '#playlists':
        util.toggleTab("nav#playlists")
        require('./playlists.js').mainView()
        break
    default:
        window.location.hash = '#welcome'
    }
}