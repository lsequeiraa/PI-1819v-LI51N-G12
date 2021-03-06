'use strict';

class authService {
    constructor(yamaAuthDB) {
        this.yamaAuthDB = yamaAuthDB
    }

    authUser(data) {
        return this.yamaAuthDB.authUser(data)
    }

    postUser(data) {
        return this.yamaAuthDB.postUser(data)
    }

    getUser(id) {
        return this.yamaAuthDB.getUser({'id' : id})
    }
}

module.exports = authService;