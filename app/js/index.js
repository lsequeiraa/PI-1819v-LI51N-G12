'use strict'

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

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
const divLogin = document.getElementById('login')
showLogin()
    .then(() => {
        window.onload = showView
        window.onhashchange = showView
    })
    .catch((err) => utils.showAlert(err,'danger'))

async function showLogin() {
    return Promise.resolve()
    /*utils.checkAuth()
        .then((body)=>{
            divLogin.innerHTML = loginNavbarView(body)
        })*/
}

const showView = async () => {
    const [view, ...params] = window.location.hash.split('/')
    switch (view) {
    case '#welcome':
        toggleTab("nav#welcome")
        break
    case '#artists':
        //require('./ligas.js')(divMain)
        toggleTab("nav#artists")
        break
    case '#playlists':
        //require('./grupos.js')(divMain)
        toggleTab("nav#playlists")
        break
    case '#login':
        //require('./login.js')(divMain,showLogin)
        break
    case '#logout':
        //require('./logout.js')(divMain,showLogin)
        break
    default:
    // Unrecognized view.
        window.location.hash = '#welcome'
        //throw Error(`Unrecognized view: ${view}`)
    }
}

function toggleTab(name){
    var current = document.getElementsByClassName("active")
    current[0].className = current[0].className.replace(" active", "");
    var thisNav = document.getElementById(name)
    thisNav.className += " active"
}

//window.onload = showView
//window.onhashchange = showView