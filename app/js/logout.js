'use strict'

const util = require('./util.js')

module.exports = () => {
    console.log('HELLO!!!!');
    
    const url = 'http://localhost:3000/auth/logout'
    fetch(url, {mode: 'cors'})
        .then((resp) => {
            if(!resp.ok) return Promise.reject(resp.status + ': ' + resp.statusText)
            util.showLogin()
        })
        .catch(err => utils.showAlert(err, 'danger'))
};