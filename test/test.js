/* eslint-disable */
const describe = require('mocha').describe;
const chai = require("chai");
/*const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);*/

const expect = chai.expect;

let services = new (require('./../lib/yama-services.js'))(new (require('./../lib/yama-db.js')), require('./../lib/lastfm.js'));

describe('YamaService', function() {
    describe('Last.fm', function() {
        describe('getArtists(query)', function() {
            context('on success', function() {
                it('should return a valid list of artists if it exists', function(done) {
                    return services.getArtists({artist: 'Cher'}, function (err, result) {
                        expect(result).to.have.property('totalResults');
                        expect(result).to.have.property('artists').that.is.an('array');

                        let art1 = result.artists[0];
                        let art2 = result.artists[1];

                        expect(result).to.have.property('totalResults');
                        expect(art1).to.include({name: 'Cher', mbid: 'bfcc6d75-a6a5-4bc6-8282-47aec8531818'});
                        expect(art2).to.include({name: 'Cheryl Cole', mbid: '2d499150-1c42-4ffb-a90c-1cc635519d33'});

                        done();
                    })
                        /*.then((result) => {
                            let art1 = result.artists[0];
                            let art2 = result.artists[1];

                            expect(result).to.have.property('totalResults');
                            expect(art1).to.include({name: 'Cher', mbid: 'bfcc6d75-a6a5-4bc6-8282-47aec8531818'});
                            expect(art2).to.include({name: 'Cheryl Cole', mbid: '2d499150-1c42-4ffb-a90c-1cc635519d33'});

                        })*/
                });
            });

            context('on failure', function() {
                it('should send an error if no artist name is given', function(done) {
                    return services.getArtists(undefined, function (err) {
                        expect(err).to.be.an('object');

                        done();
                    })
                })
                /*it('should reject promise if no artist name is given', () => {
                    return expect(services.getArtists(undefined)).to.eventually.be.rejected;
                });*/
            });
        });

        describe('getArtistTopAlbums(arId, query)', function() {
            context('on success', function() {
                it('should return a valid list of albums from a specific artist if it exists', function(done) {
                    return services.getArtistTopAlbums('bfcc6d75-a6a5-4bc6-8282-47aec8531818', null, function (err, result) {
                        expect(result).to.have.property('totalResults');
                        expect(result).to.have.property('albums').that.is.an('array');

                        let alb1 = result.albums[0];
                        let alb2 = result.albums[1];

                        expect(alb1).to.have.property('name');
                        expect(alb1).to.have.property('mbid');
                        expect(alb1).to.have.property('playcount');

                        expect(alb1).to.include({name: 'Believe', mbid: '63b3a8ca-26f2-4e2b-b867-647a6ec2bebd'});
                        expect(alb2).to.include({name: 'The Very Best of Cher', mbid: 'a7e2dad7-e733-4bee-9db1-b31e3183eaf5'});

                        done();
                    })
                        /*.then((result) => {
                            let alb1 = result.albums[0];
                            let alb2 = result.albums[1];

                            expect(alb1).to.include({name: 'Believe', mbid: '63b3a8ca-26f2-4e2b-b867-647a6ec2bebd'});
                            expect(alb2).to.include({name: 'The Very Best of Cher', mbid: 'a7e2dad7-e733-4bee-9db1-b31e3183eaf5'});

                        })*/
                });
            });

            context('on failure', function() {
                it('should send an error if no artist name is given', function(done) {
                    return services.getArtistTopAlbums(undefined, null, function (err) {
                        expect(err).to.be.an('object');
                        expect(err).to.include({code: 400});

                        done();
                    })
                })
                /*it('should reject promise if no mbid is given', () => {
                    return expect(services.getArtistTopAlbums(undefined)).to.eventually.be.rejected;
                });*/
            });
        });

        describe('getAlbum(alId)', function() {
            context('on success', function() {
                it('should return a valid album if it exists', function(done) {
                    return services.getAlbum('63b3a8ca-26f2-4e2b-b867-647a6ec2bebd', function (err, result) {
                        expect(result).to.have.property('listeners');

                        let tracks = result.tracks;

                        expect(result).to.include({name: 'Believe', artist: 'Cher', mbid: '63b3a8ca-26f2-4e2b-b867-647a6ec2bebd'});
                        expect(tracks[0]).to.include({name: 'Believe', duration: '240'});

                        done();
                    })
                        /*.then((result) => {
                            expect(result).to.have.property('listeners');

                            let tracks = result.tracks;

                            expect(result).to.include({Name: 'Believe', Artist: 'Cher', mbid: '63b3a8ca-26f2-4e2b-b867-647a6ec2bebd'});
                            expect(tracks[0]).to.include({name: 'Believe', duration: '240'});
                        })*/
                });
            });

            context('on failure', function() {
                it('should send an error if no artist name is given', function(done) {
                    return services.getAlbum(undefined, function (err) {
                        expect(err).to.be.an('object');

                        done();
                    })
                })
                /*it('should reject promise if no mbid is given', () => {
                    return expect(services.getAlbum(undefined)).to.eventually.be.rejected;
                });*/
            });
        });
    });

    describe('Yama-DB', function() {
        describe('postPlaylist(body)', function() {
            afterEach (function(done) {
                if (this.currentTest.pId) {
                    return services.deletePlaylist(this.currentTest.pId, function(err) {
                        if (err) done(err);
                        else done();
                    })
                }
            });
            context('on success', function() {
                it('should return the created playlist', function (done) {
                    let that = this.test;

                    let name = 'testPostPlaying';
                    let desc = 'best test!';
                    return services.postPlaylist({name: name, description: desc}, function (err, result) {
                        expect(result).to.include({name: name, description: desc});

                        expect(result).to.have.property('id');
                        expect(result).to.have.property('totalDuration');
                        expect(result).to.have.property('tracks');

                        that.pId = result.id;

                        done();
                    })
                });
            });
        });

        describe('putPlaylist(pId, body)', function() {
            beforeEach (function(done) {
                let that = this.currentTest;

                return services.postPlaylist({name: 'testPutPlaylist', description: 'best test!'}, function(err, result) {
                    if (err) done(err);
                    else {
                        that.pId = result.id;
                        done();
                    }
                })
            });
            afterEach (function(done) {
                if (this.currentTest.pId) {
                    return services.deletePlaylist(this.currentTest.pId, function(err) {
                        if (err) done(err);
                        else done();
                    })
                }
            });
            context('on success', function() {
                it('should return the edited playlist if it exists', function (done) {
                    let that = this.test;

                    let name = 'editedPutPlaylist';
                    let desc = 'better test!';
                    return services.putPlaylist(this.test.pId,{name: name, description: desc}, function (err, result) {
                        expect(result).to.include({name: name, description: desc});

                        expect(result).to.have.property('id', that.pId);
                        //expect(result).to.have.property('totalDuration');
                        //expect(result).to.have.property('tracks');

                        that.pId = result.id;

                        done();
                    })
                });
            });
        });

        describe('getPlaylists()', function() {
            beforeEach (function(done) {
                let that = this.currentTest;
                that.ids = [];

                return services.postPlaylist({name: 'testPutPlaylist', description: 'best test!'}, function(err, result) {
                    if (err) done(err);
                    else {
                        that.ids.push(result.id);
                        services.postPlaylist({name: 'testPutPlaylist', description: 'best test!'}, function(err, result) {
                            if (err) done(err);
                            else {
                                that.ids.push(result.id);
                                services.postPlaylist({
                                    name: 'testPutPlaylist',
                                    description: 'best test!'
                                }, function (err, result) {
                                    if (err) done(err);
                                    else {
                                        that.ids.push(result.id);
                                        services.postPlaylist({
                                            name: 'testPutPlaylist',
                                            description: 'best test!'
                                        }, function (err, result) {
                                            if (err) done(err);
                                            else {
                                                that.ids.push(result.id);
                                                done();
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    }
                })
            });
            afterEach (function(done) {
                let that = this.currentTest;
                if (that.ids) {
                    return services.deletePlaylist(that.ids[0], function(err) {
                        if (err) done(err);
                        else services.deletePlaylist(that.ids[1], function (err) {
                            if (err) done(err);
                            else services.deletePlaylist(that.ids[2], function (err) {
                                if (err) done(err);
                                else services.deletePlaylist(that.ids[3], function (err) {
                                    if (err) done(err);
                                    else done();
                                })
                            })
                        })
                    })
                }
            });
            context('on success', function() {
                it('should return a valid list of playlists', function (done) {
                    return services.getPlaylists(function (err, result) {
                        expect(result).to.have.property('totalResults');
                        expect(result).to.have.property('playlists').that.is.an('array').to.have.lengthOf.at.least(4);

                        done();
                    })
                });
            });
        });

        context('getPlaylist(pId)', function() {
            beforeEach (function(done) {
                let that = this.currentTest;
                that.name = 'testPutPlaylist';
                that.desc = 'best test!';
                services.postPlaylist({name: that.name, description: that.desc}, function(err, result) {
                    if (err) done(err);
                    else {
                        that.pId = result.id;
                        done();
                    }
                })
            });
            afterEach (function(done) {
                if (this.currentTest.pId) {
                    services.deletePlaylist(this.currentTest.pId, function(err) {
                        if (err) done(err);
                        else done();
                    })
                }
            });
            context('on success', function() {
                it('should return a valid playlist if it exists', function (done) {
                    let that = this.test;
                    return services.getPlaylist(this.test.pId, function(err, result) {
                        expect(result).to.include({name: that.name, description: that.desc});

                        expect(result).to.have.property('id', that.pId);
                        expect(result).to.have.property('totalDuration');
                        expect(result).to.have.property('tracks');

                        that.pId = result.id;

                        done();
                    })
                });
            });
        });

        context('putPlaylistMusic(pId, mId, body)', function() {
            beforeEach (function(done) {
                let that = this.currentTest;
                that.name = 'testPutPlaylistMusic';
                that.desc = 'best test!';
                services.postPlaylist({name: that.name, description: that.desc}, function(err, result) {
                    if (err) done(err);
                    else {
                        that.pId = result.id;
                        done();
                    }
                })
            });
            afterEach (function(done) {
                if (this.currentTest.pId) {
                    services.deletePlaylist(this.currentTest.pId, function(err) {
                        if (err) done(err);
                        else done();
                    })
                }
            });
            context('on success', function() {
                it('should return the edited playlist if it exists', function (done) {
                    let that = this.test;
                    return services.putPlaylistMusic(this.test.pId,'32ca187e-ee25-4f18-b7d0-3b6713f24635', function (err, result) {
                        expect(result).to.include({name: that.name, description: that.desc});

                        expect(result).to.have.property('id', that.pId);
                        expect(result).to.have.property('totalDuration', 240000);
                        expect(result).to.have.property('tracks').to.be.an('array');

                        let tracks = result.tracks;
                        expect(tracks[0]).to.have.property('mbid', '32ca187e-ee25-4f18-b7d0-3b6713f24635');
                        expect(tracks[0]).to.have.property('name', 'Believe');
                        expect(tracks[0]).to.have.property('duration', 240000);

                        that.pId = result.id;

                        done();
                    });
                });
            });
        });

        context('deletePlaylistMusic(pId, mId, cb)', function() {
            beforeEach (function(done) {
                let that = this.currentTest;
                that.name = 'testDeletePlaylistMusic';
                that.desc = 'best test!';
                services.postPlaylist({name: that.name, description: that.desc}, function(err, result) {
                    if (err) done(err);
                    else {
                        that.pId = result.id;
                        services.putPlaylistMusic(that.pId,'32ca187e-ee25-4f18-b7d0-3b6713f24635', function(err, result) {
                            if (err) done(err);
                            else {
                                done();
                            }
                        })
                    }
                });
            });
            afterEach (function(done) {
                if (this.currentTest.pId) {
                    services.deletePlaylist(this.currentTest.pId, function(err) {
                        if (err) done(err);
                        else done();
                    })
                }
            });
            context('on success', function() {
                it('should return the edited playlist if it exists', function (done) {
                    let that = this.test;
                    return services.deletePlaylistMusic(this.test.pId,'32ca187e-ee25-4f18-b7d0-3b6713f24635', function (err, result) {
                        expect(result).to.include({name: that.name, description: that.desc});

                        expect(result).to.have.property('id', that.pId);
                        expect(result).to.have.property('totalDuration', 0);
                        expect(result).to.have.property('tracks').to.be.an('array').to.be.empty;

                        that.pId = result.id;

                        done();
                    });
                });
            });
        });
    });

});