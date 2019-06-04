'use strict'

const Handlebars = require('./../../node_modules/handlebars/dist/handlebars.js')
const alertView = Handlebars.compile(require('../views/alert.hbs'))
const loginNavbarView = Handlebars.compile(require('../views/loginNavbarView.hbs'))

module.exports = {
    showAlert,
    checkAuth,
    toggleTab,
    showLogin
}

async function showLogin() {
    const divLogin = document.getElementById('login')
    checkAuth()
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
}

/**
 * Show an alert to the user.
 */
function showAlert(message, type) {
    document
        .getElementById('divAlerts')
        .insertAdjacentHTML('beforeend', alertView({type, message}))
}

async function checkAuth(){
    const resp = await fetch('http://localhost:3000/auth/session',{mode: 'cors'})
    const body = await resp.json() // body => {auth, username}
    if(resp.status != 200) {
        showAlert(JSON.stringify(body))
    }
    return body
}

function toggleTab(name){
    var current = document.getElementsByClassName('active')
    current[0].className = current[0].className.replace(' active', '');
    var thisNav = document.getElementById(name)
    thisNav.className += ' active'
}