const express = require('express'),
      path = require('path'),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose'),
      passport = require('passport'),
      session = require('express-session'),
      count = require('./server/routes/count'),
      auth = require('./server/routes/auth'),
      index = require('./server/routes/index'),
      users = require('./server/routes/users')


passport.serializeUser(function(user, done) {
        done(null, user);
       });
       
passport.deserializeUser(function(obj, done) {
        done(null, obj);
       });
require('dotenv').load();
require('./passport')(passport)

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI);

let app = express()

app.use(express.static(path.join(__dirname, './dist')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({
  secret: 'test-secret',
  resave: false,
  saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())

app.use('/auth', auth)
app.use('/count', count)
app.use('/', index)
app.use('/users', users)

const port =  process.env.PORT || 3000;
app.listen(port, () => console.log('Running on localhost:', port))
