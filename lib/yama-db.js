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

    postPlaylist (body){
        let url = this.dbUrl + '_doc'

        return new Promise( (resolve, reject) =>{
            let dataF = ''

            let playlist = {
                'name' : body.name,
                'description' : body.description,
                'tracks' : []
            }

            request.post({
                'url':url,
                'body':playlist,
                'json':true
            })
                .on('error', err => reject(err))
                .on('data',data => dataF += data)
                .on('end', () => resolve(JSON.parse(dataF)))
        } )

    }
    
}

module.exports = YamaDB