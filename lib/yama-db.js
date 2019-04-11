'use strict'

const request = require('request')

class YamaDB {
    constructor(baseUrl = 'http://localhost:9200/', dbIndex = 'yama') {
        //this.baseUrl = baseUrl;
        //this.dbIndex = dbIndex;

        this.dbUrl = baseUrl + dbIndex + '/'

        /*request.head(this.dbUrl)
            .on('response', (resp) => {
                if (resp.statusCode !== 200) throw new Error(`Index ${dbIndex} not available.`)
            })*/
    }
        
    getPlaylists (cb){
        let dataF = ''
        return request.get({
            uri: this.dbUrl+'_doc/_search',
            encoding: 'utf8'
        })
            .on('error', err => cb(err))
            .on('data', data => dataF += data)
            .on('end', () => cb(null,JSON.parse(dataF)))
    }

    postPlaylist (body, cb){
        let url = this.dbUrl + '_doc'

        
        let dataF = ''

        let playlist = {
            'name' : body.name,
            'description' : body.description,
            'totalDuration' : 0,
            'tracks' : []
        }

        return request.post({
            'url':url,
            'body':playlist,
            'json':true
        })
            .on('error', err => cb(err))
            .on('data',data => dataF += data)
            .on('end', () => cb(null,{id: JSON.parse(dataF)._id, playlist}))

    }

    
}

module.exports = YamaDB