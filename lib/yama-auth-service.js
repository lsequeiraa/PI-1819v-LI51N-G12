'use strict';

class authService {
    constructor(yamaAuthDB) {
        this.yamaAuthDB = yamaAuthDB
    }

    authUser(data) {
        return this.yamaAuthDB.authUser(data)
            .then(id => this.yamaAuthDB.getUser(id))
    }

    postUser(data) {
        return this.yamaAuthDB.postUser(data)
    }

    getUser(id) {
        return this.yamaAuthDB.getUser({'id' : id})
    }

    addPlaylist(uId, eId) {
        return this.yamaAuthDB.addPlaylist(uId, eId)
    }
}

module.exports = authService;