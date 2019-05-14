'use strict'

const Handlebars = require('./../../node_modules/handlebars/dist/handlebars.js')
const alertView = Handlebars.compile(require('../views/alert.hbs'))

module.exports = {
    showAlert,
    checkAuth
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
    const resp = await fetch('/auth/session')
    const body = await resp.json() // body => {auth, username}
    if(resp.status != 200) {
        showAlert(JSON.stringify(body))
    }
    return body
}