'use strict'

const util = require('./util.js')
const loginView = require('../views/login.html')

module.exports = (divMain, getAuthAndInsertNavbar) => {
    divMain.innerHTML = loginView

    const txtPassword = document.getElementById('inputPassword')
    const txtUsername = document.getElementById('inputUsername')

    document
        .getElementById('buttonSignup')
        .addEventListener('click', signupHander)
    document
        .getElementById('buttonLogin')
        .addEventListener('click', loginHander)

    function signupHander(ev) {
        ev.preventDefault()
        const url = 'http://localhost:3000/auth/register'
        const options = {
            method: 'POST',
            body: JSON.stringify({
                'username': txtUsername.value,
                'password': txtPassword.value
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        fetch(url, options)
            .then((resp) => {
                if(!resp.ok) return Promise.reject(resp.status + ': ' + resp.statusText)
                window.location.hash = '#welcome'
                getAuthAndInsertNavbar()
            })
            .catch(err => util.showAlert(err, 'danger'))
    }

    async function loginHander(ev) {
        ev.preventDefault()
        const url = 'http://localhost:3000/auth/login'
        const options = {
            method: 'POST',
            body: JSON.stringify({
                'username': txtUsername.value,
                'password': txtPassword.value
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const resp = await fetch(url, options)
        try{
            if(resp.ok){
                window.location.hash = '#welcome'
                getAuthAndInsertNavbar()
            } else {
                const body = await resp.json()
                util.showAlert(`${resp.status} ${resp.statusText}: ${JSON.stringify(body)}`)
            }
        } catch(err){
            util.showAlert(`${resp.status} ${resp.statusText}`, 'danger')
        }
    }
}