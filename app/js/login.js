'use strict'

const util = require('./util.js')
//const loginView = require('../views/login.html')

module.exports = {
    signupHander,
    loginHander
}


//divMain.innerHTML = loginView

function signupHander() {
    let txtPassword = document.getElementById('userPassword')
    let txtUsername = document.getElementById('userName')

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
            util.showAlert('Signed up with success!', 'success');
        })
        .catch(err => util.showAlert(err, 'danger'))
}

async function loginHander() {
    let txtPassword = document.getElementById('userPassword')
    let txtUsername = document.getElementById('userName')
    
    const url = `http://localhost:3000/auth/login?username=${txtUsername.value}&password=${txtPassword.value}`;
    const options = {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const resp = await fetch(url, options)
    try{
        if(resp.ok){
            util.showLogin()
            util.showAlert('Logged in with success!', 'success');
        } else {
            const body = await resp.json()
            util.showAlert(`${resp.status} ${resp.statusText}: ${JSON.stringify(body)}`)
        }
    } catch(err){
        util.showAlert(`${resp.status} ${resp.statusText}`, 'danger')
    }
}
