'use strict'
//const request = require('request')

const rp = require('request-promise')
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

function getRequest (uri) {
    
    return rp({
        method : 'GET',
        uri: uri+api_key+format,
        encoding: 'utf8',
        json : true
    })

        .then(data => data)
        .catch( err => err )
        /*.on('error', err => cb(err))
        .on('data',data => dataF += data)
        .on('end', () => cb(null,JSON.parse(dataF)))*/
}

class Lastfm{
    static getArtists(query){
        let fields = ['artist','limit', 'page']
        let options= checkFields(query,fields)
        if(options.artist === '') return Promise.reject({code:400,message:'No artist name specified.'})
        const url = `?method=artist.search&artist=${options.artist}&limit=${options.limit}&page=${options.page}`
        return getRequest(baseUrl + url)
    }

    static getArtistTopAlbums(arID,query){
        let fields = ['artist','limit', 'page']
        let options= checkFields(query,fields)
        if(arID === '' && options.artist === '')  return Promise.reject({code:400,message:'Please specify an artist name or an mbid of an artist.'})
        const url = `?method=artist.gettopalbums&mbid=${arID}&artist=${options.artist}&limit=${options.limit}&page=${options.page}`
        return getRequest(baseUrl + url)
    }

    static getAlbum(alid){
        if(alid === '') return Promise.reject({code:400,message:'No artist mbid specified.'})
        const url = `?method=album.getinfo&mbid=${alid}`
        return getRequest(baseUrl + url)
    }

    static getTrack(body) {
        let fields = ['artist','name']
        let options= checkFields(body,fields)
        if (options.artist === '' || options.name === '') return Promise.reject({code:400,message:'No track found.'});
        const url = `?method=track.getInfo&artist=${options.artist}&track=${options.name}`;
        return getRequest(baseUrl + url);
    }
}
module.exports= Lastfm 