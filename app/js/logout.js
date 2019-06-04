'use strict'

const utils = require('./util.js')

module.exports = (divMain, getAuthAndInsertNavbar) => {
    const url = 'http://localhost:3000/auth/logout'
    fetch(url)
        .then((resp) => {
            if(!resp.ok) return Promise.reject(resp.status + ': ' + resp.statusText)
            window.location.hash = '#welcome'
            getAuthAndInsertNavbar()
        })
        .catch(err => utils.showAlert(err, 'danger'))
};