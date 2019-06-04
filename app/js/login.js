'use strict'

const util = require('./util.js')
//const loginView = require('../views/login.html')

module.exports = {
    signupHander,
    loginHander
}


//divMain.innerHTML = loginView

const txtPassword = document.getElementById('userPassword')
const txtUsername = document.getElementById('userName')

function signupHander() {
    const url = 'http://localhost:3000/auth/register'
    const options = {
        method: 'POST',
        body: JSON.stringify({
            'username': txtUsername.value,
            'password': txtPassword.value
        }),
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    fetch(url, options)
        .then((resp) => {
            if(!resp.ok) return Promise.reject(resp.status + ': ' + resp.statusText)
            util.showLogin()
        })
        .catch(err => util.showAlert(err, 'danger'))
}

async function loginHander() {
    const url = 'http://localhost:3000/auth/login'
    const options = {
        method: 'POST',
        body: JSON.stringify({
            'username': txtUsername.value,
            'password': txtPassword.value
        }),
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const resp = await fetch(url, options)
    try{
        if(resp.ok){
            util.showLogin()
        } else {
            const body = await resp.json()
            util.showAlert(`${resp.status} ${resp.statusText}: ${JSON.stringify(body)}`)
        }
    } catch(err){
        util.showAlert(`${resp.status} ${resp.statusText}`, 'danger')
    }
}
