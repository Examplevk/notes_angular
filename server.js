import express                   from 'express';
import mongoose                  from 'mongoose';
import passport                  from 'passport';
import Strategy                  from 'passport-local';
import cookieParser              from 'cookie-parser';
import bodyParser                from 'body-parser';
import {MongoClient}             from 'mongodb';
import Account                   from './shared/models/account';
import flash                     from 'connect-flash';
import path                      from 'path';
const app = express();


mongoose.connect('mongodb://localhost:27017/test');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(express.static(path.join(__dirname, 'static')));

passport.use(new Strategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

app.use('/autoriz', require('./shared/server/autorization'));
app.use('/data', require('./shared/server/data'));

app.get('/test', (req, res) => {
  Account.register(new Account({username: "test"}), "test", (data) => {
    res.json(data)
  })
})

app.all('/notes', function(req, res, next){
  req.isAuthenticated()
      ? next()
      : res.redirect('/');
})
app.all('/', function(req, res, next){
  req.isAuthenticated()
      ? res.redirect('/notes')
      : next();
})
app.use((req, res) => {



});

export default app;
