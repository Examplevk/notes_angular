import express  from 'express';
import {MongoClient, ObjectID} from 'mongodb';
import passport                  from 'passport';
import Account  from '../models/account';


let router = express.Router();

let database;

MongoClient.connect('mongodb://localhost:27017/test', function(err, db) {
    if (err) {
        throw err;
    }
    database = db;

});

router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) { return next(err); }
        if (!user) { return res.send(false); }
        req.logIn(user, function(err) {
            if (err) { return next(err); }
            return res.send(true);
        });
    })(req, res, next);
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.post('/register', function(req, res) {
    Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
        if (err) {
            res.json({"success": false});
        }else
            res.json({"success": true});

    });
});

module.exports = router;