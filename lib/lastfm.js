'use strict'
const request = require('request')
const baseUrl = 'http://ws.audioscrobbler.com/2.0/'

const api_key= '&api_key=eb54df9f9cc6f28c0811d80928f49328'
const format = '&format=json'

function checkFields(options, fields) {
    if (!options) options = {}
    fields.forEach((field) => {
        if (!options[field]) options[field] = ''
    })

    return options
}

function getRequest (uri,cb) {
    let dataF = ''
    request.get({
        uri: uri+api_key+format,
        encoding: 'utf8'
    })
        .on('error', err => cb(err))
        .on('data',data => dataF += data)
        .on('end', () => cb(null,JSON.parse(dataF)))
}

class Lastfm{
    static getArtists(query,cb){
        let fields = ['artist','limit', 'page']
        let options= checkFields(query,fields)
        if(options.artist === '') cb({code:400,message:'No artist name specified.'})
        const url = `?method=artist.search&artist=${options.artist}&limit=${options.limit}&page=${options.page}`
        getRequest(baseUrl + url,cb)

    }

    static getArtistTopAlbums(arID,query,cb){
        let fields = ['artist','limit', 'page']
        let options= checkFields(query,fields)
        if(arID === '' && options.artist === '') cb({code:400,message:'Please specify an artist name or an mbid of an artist.'})
        const url = `?method=artist.gettopalbums&mbid=${arID}&artist=${options.artist}&limit=${options.limit}&page=${options.page}`
        getRequest(baseUrl + url,cb)

    }

    static  getAlbum(alid,cb){
        if(alid === '') cb({code:400,message:'No artist mbid specified.'})
        const url = `?method=album.getinfo&mbid=${alid}`
        getRequest(baseUrl + url,cb)
    }
}
module.exports= Lastfm 