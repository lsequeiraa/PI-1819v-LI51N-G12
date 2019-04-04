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
                        let alb1 = result.albums[0];
                        let alb2 = result.albums[1];

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

});