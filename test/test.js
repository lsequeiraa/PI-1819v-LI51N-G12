/* eslint-disable */
const describe = require('mocha').describe;
const chai = require("chai");
/*const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);*/

const expect = chai.expect;
const should = chai.should();

let services = new (require('./../lib/yama-services.js'))(new (require('./../lib/yama-db.js')), require('./../lib/lastfm.js'));

describe('YamaService', function() {
    describe('Last.fm', function() {
        describe('getArtists(query)', function() {
            context('on success', function() {
                it('should return a valid list of artists if it exists', function(done) {
                    services.getArtists({artist: 'Cher'})
                        .then((result) => {
                            expect(result).to.have.property('totalResults');
                            expect(result).to.have.property('artists').that.is.an('array');

                            let art1 = result.artists[0];
                            let art2 = result.artists[1];

                            expect(result).to.have.property('totalResults');
                            expect(art1).to.include({name: 'Cher', mbid: 'bfcc6d75-a6a5-4bc6-8282-47aec8531818'});
                            expect(art2).to.include({name: 'Cheryl Cole', mbid: '2d499150-1c42-4ffb-a90c-1cc635519d33'});
                        })
                        .finally(done);
                });
            });

            context('on failure', function() {
                it('should send an error if no artist name is given', function(done) {
                    services.getArtists(undefined)
                        .catch( (err) => expect(err).to.be.an('object'))
                        .finally(done);
                })
                /*it('should reject promise if no artist name is given', () => {
                    return expect(services.getArtists(undefined)).to.eventually.be.rejected;
                });*/
            });
        });

        describe('getArtistTopAlbums(arId, query)', function() {
            context('on success', function() {
                it('should return a valid list of albums from a specific artist if it exists', function(done) {
                    services.getArtistTopAlbums('bfcc6d75-a6a5-4bc6-8282-47aec8531818', null)
                        .then((result) => {
                            expect(result).to.have.property('totalResults');
                            expect(result).to.have.property('albums').that.is.an('array');

                            let alb1 = result.albums[0];
                            let alb2 = result.albums[1];

                            expect(alb1).to.have.property('name');
                            expect(alb1).to.have.property('mbid');
                            expect(alb1).to.have.property('playcount');

                            expect(alb1).to.include({name: 'Believe', mbid: '63b3a8ca-26f2-4e2b-b867-647a6ec2bebd'});
                            expect(alb2).to.include({name: 'The Very Best of Cher', mbid: 'a7e2dad7-e733-4bee-9db1-b31e3183eaf5'});
                        })
                        .finally(done);
                });
            });

            context('on failure', function() {
                it('should send an error if no artist name is given', function(done) {
                    services.getArtistTopAlbums(undefined, null)
                        .catch((err) => {
                            expect(err).to.be.an('object');
                            expect(err).to.include({code: 400});
                        })
                        .finally(done)
                });
                /*it('should reject promise if no mbid is given', () => {
                    return expect(services.getArtistTopAlbums(undefined)).to.eventually.be.rejected;
                });*/
            });
        });

        describe('getAlbum(alId)', function() {
            context('on success', function() {
                it('should return a valid album if it exists', function(done) {
                    services.getAlbum('63b3a8ca-26f2-4e2b-b867-647a6ec2bebd')
                        .then((result)=> {
                            expect(result).to.have.property('listeners');

                            let tracks = result.tracks;

                            expect(result).to.include({name: 'Believe', artist: 'Cher', mbid: '63b3a8ca-26f2-4e2b-b867-647a6ec2bebd'});
                            expect(tracks[0]).to.include({name: 'Believe', duration: '230'});
                        })
                        .finally(done);
                });
            });

            context('on failure', function() {
                it('should send an error if no artist name is given', function(done) {
                    services.getAlbum(undefined)
                        .catch((err) => {
                            expect(err).to.be.an('object');
                        })
                        .finally(done);
                })
                /*it('should reject promise if no mbid is given', () => {
                    return expect(services.getAlbum(undefined)).to.eventually.be.rejected;
                });*/
            });
        });
    });

    describe('Yama-DB', function() {
        describe('postPlaylist(uId, body)', function () {
            context('on success', function () {
                afterEach(function (done) {
                    if (this.currentTest.pId) {
                        services.deletePlaylist(this.currentTest.pId)
                            .finally(done);
                    }
                });
                it('should return the created playlist', function (done) {
                    let that = this.test;

                    let name = 'testPostPlaying';
                    let desc = 'best test!';
                    services.postPlaylist("123test",{name: name, description: desc})
                        .then((result)=> {
                            expect(result).to.include({name: name, description: desc});

                            expect(result).to.have.property('id');
                            expect(result).to.have.property('totalDuration');
                            expect(result).to.have.property('tracks');

                            that.pId = result.id;
                        })
                        .finally(done);
                });
            });
            context('on failure', function () {
                it('should send an error if no name is provided', function (done) {
                    let desc = 'best test!';
                    services.postPlaylist("123test", {description: desc})
                        .catch(err => {
                            should.exist(err);
                            expect(err).to.have.property('code');
                        })
                        .finally(done);
                });
                it('should send an error if no description is provided', function (done) {
                    let name = 'testPostPlaying';
                    services.postPlaylist("123test", {name: name})
                        .catch(err => {
                            should.exist(err);
                            expect(err).to.have.property('code');
                        })
                        .finally(done);
                });
                it('should send an error if no body is provided', function (done) {
                    services.postPlaylist("123test", null)
                        .catch(err => {
                            should.exist(err);
                            expect(err).to.have.property('code');
                        })
                        .finally(done);
                });
            });
        });

        describe('putPlaylist(pId, body)', function () {
            beforeEach(function (done) {
                let that = this.currentTest;

                services.postPlaylist("123test", {
                    name: 'testPutPlaylist',
                    description: 'best test!'
                })
                .then((result) => {
                    that.pId = result.id;
                })
                    .finally(done);
            });
            afterEach(function (done) {
                if (this.currentTest.pId) {
                    services.deletePlaylist(this.currentTest.pId)
                    .finally(done);
                }
            });
            context('on success', function () {
                it('should return the edited playlist if it exists', function (done) {
                    let that = this.test;

                    let name = 'editedPutPlaylist';
                    let desc = 'better test!';

                    services.putPlaylist(this.test.pId, {
                        name: name,
                        description: desc
                    })
                    .then(result => {
                        expect(result).to.include({name: name, description: desc});

                        expect(result).to.have.property('id', that.pId);
                        //expect(result).to.have.property('totalDuration');
                        //expect(result).to.have.property('tracks');

                        that.pId = result.id;
                    })
                        .finally(done);
                });
            });
            context('on failure', function () {
                it('should send an error if index doesnt exist', function (done) {
                    let that = this.test;

                    let name = 'editedPutPlaylist';
                    let desc = 'better test!';

                    services.putPlaylist('thisindexshouldntexist', {name: name, description: desc})
                    .catch(err=> {
                        should.exist(err);
                        expect(err).to.have.property('code');
                    })
                        .finally(done);
                });
            });
        });

        describe('getPlaylists(uId)', function () {
            beforeEach(function (done) {
                let that = this.currentTest;
                that.ids = [];

                services.postPlaylist("123test", {
                    name: 'testGetPlaylists1',
                    description: 'best test!'
                })
                .then(result => {
                    that.ids.push(result.id);
                    return services.postPlaylist("123test", {
                        name: 'testGetPlaylists2',
                        description: 'best test!'
                    })
                })
                .then(result => {
                    that.ids.push(result.id);
                    return services.postPlaylist("123test", {
                        name: 'testGetPlaylists3',
                        description: 'best test!'
                    })
                })
                .then(result => {
                    that.ids.push(result.id);
                    return services.postPlaylist("123test", {
                        name: 'testGetPlaylists4',
                        description: 'best test!'
                    })
                })
                .then(result => {
                        that.ids.push(result.id);
                    }
                )
                .catch(err=> err)
                    .finally(done);
            });
            afterEach(function (done) {
                let that = this.currentTest;
                if (that.ids) {
                    services.deletePlaylist(that.ids[0])
                        .then(()=> services.deletePlaylist(that.ids[1]))
                        .then(()=> services.deletePlaylist(that.ids[2]))
                        .then(()=> services.deletePlaylist(that.ids[3]))
                        .finally(done);
                }
            });
            context('on success', function () {
                it('should return a valid list of playlists', function (done) {
                    setTimeout(function () {
                        services.getPlaylists("123test")
                            .then(result=> {
                                expect(result).to.have.property('totalResults');
                                expect(result).to.have.property('playlists').that.is.an('array').to.have.lengthOf.at.least(4);
                            })
                            .finally(done);
                    }, 2000);
                });
            });
        });

        context('getPlaylist(pId)', function () {
            beforeEach(function (done) {
                let that = this.currentTest;
                that.name = 'testPutPlaylist';
                that.desc = 'best test!';
                services.postPlaylist("123test", {name: that.name, description: that.desc})
                    .then(result=> {
                            that.pId = result.id;
                    })
                    .finally(done);
            });
            afterEach(function (done) {
                if (this.currentTest.pId) {
                    services.deletePlaylist(this.currentTest.pId)
                        .finally(done);
                }
            });
            context('on success', function () {
                it('should return a valid playlist if it exists', function (done) {
                    let that = this.test;
                    services.getPlaylist(this.test.pId)
                        .then(result=> {
                            expect(result).to.include({name: that.name, description: that.desc});

                            expect(result).to.have.property('id', that.pId);
                            expect(result).to.have.property('totalDuration');
                            expect(result).to.have.property('tracks');

                            that.pId = result.id;
                        })
                        .finally(done);
                });
            });
        });

        context('putPlaylistMusic(pId, mId, body)', function () {
            beforeEach(function (done) {
                let that = this.currentTest;
                that.name = 'testPutPlaylistMusic';
                that.desc = 'best test!';
                services.postPlaylist("123test", {name: that.name, description: that.desc})
                    .then(result=> {
                        that.pId = result.id;
                    })
                    .finally(done);
            });
            afterEach(function (done) {
                if (this.currentTest.pId) {
                    services.deletePlaylist(this.currentTest.pId)
                    .finally(done);
                }
            });
            context('on success', function () {
                it('should return the edited playlist if it exists', function (done) {
                    let that = this.test;
                    services.putPlaylistMusic(this.test.pId, {
                        artist: 'Cher',
                        name: 'Believe'
                    })
                        .then(result=> {
                            expect(result).to.include({name: that.name, description: that.desc});

                            expect(result).to.have.property('id', that.pId);
                            expect(result).to.have.property('totalDuration', 230000);
                            expect(result).to.have.property('tracks').to.be.an('array');

                            let tracks = result.tracks;
                            expect(tracks[0]).to.have.property('mbid', '32ca187e-ee25-4f18-b7d0-3b6713f24635');
                            expect(tracks[0]).to.have.property('name', 'Believe');
                            expect(tracks[0]).to.have.property('duration', 230000);

                            that.pId = result.id;
                        })
                        .finally(done);
                });
            });
        });

        context('deletePlaylistMusic(pId, mId, cb)', function () {
            beforeEach(function (done) {
                let that = this.currentTest;
                that.name = 'testDeletePlaylistMusic';
                that.desc = 'best test!';
                services.postPlaylist("123test", {name: that.name, description: that.desc})
                    .then(result => {
                            that.pId = result.id;
                            return services.putPlaylistMusic(that.pId, {
                                artist: 'Cher',
                                name: 'Believe'
                            })
                        })
                    .finally(done);
            });
            afterEach(function (done) {
                if (this.currentTest.pId) {
                    services.deletePlaylist(this.currentTest.pId)
                        .finally(done);
                }
            });
            context('on success', function () {
                it('should return the edited playlist if it exists', function (done) {
                    let that = this.test;
                    services.deletePlaylistMusic(this.test.pId, '32ca187e-ee25-4f18-b7d0-3b6713f24635')
                        .then(result=> {
                            expect(result).to.include({name: that.name, description: that.desc});

                            expect(result).to.have.property('id', that.pId);
                            expect(result).to.have.property('totalDuration', 0);
                            expect(result).to.have.property('tracks').to.be.an('array').to.be.empty;

                            that.pId = result.id;
                        })
                        .finally(done);
                });
            });
        });
    });
});