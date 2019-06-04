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

/*async function showLogin() {
    util.checkAuth()
        .then((body)=>{
            divLogin.innerHTML = loginNavbarView(body)
            if(!body.auth){
                document.getElementById('button_login')
                    .addEventListener('click', require('./login.js').loginHander)
                document.getElementById('button_signup')
                    .addEventListener('click', require('./login.js').signupHander)
            }
            else{
                document.getElementById('button_logout')
                    .addEventListener('click', require('./logout.js'))
            }
        })
}*/

const showView = async () => {
    const [view, ...params] = window.location.hash.split('/')
    switch (view) {
    case '#welcome':
        util.toggleTab("nav#welcome")
        divMain.innerHTML = require('../views/mainView.html')
        break
    case '#artists':
        util.toggleTab("nav#artists")
        require('./artistas.js')(divMain)
        break
    case '#playlists':
        util.toggleTab("nav#playlists")
        require('./playlists.js').mainView(divMain)
        break
    case '#login':
        //util.toggleTab("nav#login")
        //require('./login.js')(divMain,showLogin)
        break
    case '#logout':
        //util.toggleTab("nav#logout")
        //require('./logout.js')(divMain,showLogin)
        break
    default:
    // Unrecognized view.
        window.location.hash = '#welcome'
        //throw Error(`Unrecognized view: ${view}`)
    }
}

//window.onload = showView
//window.onhashchange = showView


/*function init(){
    gapi.client.setApiKey('AIzaSyBY0CSv1VNjcwsTv9cHEFpa6kyiQ30w3xM')
    gapi.client.load('youtube','v3', function(){
        
    })
}*/