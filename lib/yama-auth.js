'use strict';

const passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;

const session = require('express-session');

module.exports = (app, authService) => {

    passport.use(new LocalStrategy(
        function(username, password, done) {
            authService.authUser({ username: username })
                .then( user => {
                    if(!user)
                        done(null, false, { message: 'Incorrect username.' });
                    if(!user.checkPass(password))
                        done(null, false, { message: 'Incorrect password.' });
                    done(null, user);
                })
                .catch( (err) => done(err))
        }
    ));

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        authService.getUser(id)
            .then(user => done(null, user))
            .catch( err => done(err));
    });

    app.use(session({
        secret: 'meme cat keyboard',
        resave: false,
        saveUninitialized: true
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    app.post('/auth/login',
        passport.authenticate('local')
    );

    app.get('/auth/logout', function(req, res){
        req.logout();
        res.redirect('/');
    });

    app.post('/auth/register', function (req, resp, next) {
        let body = '';
        req.on('data', (chunk) => body += chunk);
        req.on('end', () => {
            body = JSON.parse(body);

            authService
                .postUser(body)
                .then((user) => {
                    req.login(user, function(err) {
                        if (err) { return next(err); }
                        return resp.redirect('/#playlists');
                    });
                })
                .catch((err) => {
                    resp.statusCode = err.code
                    resp.end()
                })
        })
    });

    app.get('/auth/session', function (req, resp) {
        const username = req.isAuthenticated() ? req.user.username : undefined;
        resp.json({
            'auth': req.isAuthenticated(),
            'username': username
        })
    });
};