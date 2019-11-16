/* * * * * * * * * * * * * * * * * * *
Set for DB , index page, module use, PORT 
* * * * * * * * * * * * * * * * * * */
/* (2019-11-15, Kate Ko) */


const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const UserRouter = require('./routes/users');
const PostRouter = require('./routes/posts');
const SigninRouter = require('./routes/signin');
const dotenv = require('dotenv').config();
const app = express();
const passport   = require("./config/passport");


// Message display using express-flash, cookie-parser, express-session middleware
// http://www.coding4developers.com/node-js/send-message-on-redirect-in-node-js-redirect-with-message-node-js-flash-message-in-node-js/
// https://gist.github.com/brianmacarthur/a4e3e0093d368aa8e423

const cookieParser = require('cookie-parser')
const flash = require('express-flash');
const session = require('express-session');

// To display message and sign in
app.use(session({
  secret: 'super-secret-key',
  key: 'super-secret-cookie',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}));

// To display message
app.use(flash());
app.use(cookieParser());


// Set view engine 'ejs'
app.set('view engine','ejs'); 

// GET "/" hompage
app.get('/', function(request, response){
  response.render('index', {title: "Home"} );
})


// Middleware for reading http post data
app.use(express.urlencoded({extended : false}));


// Create set connection.
mongoose.set('debug', true);
mongoose.connect(process.env.DB_CONNECTION, {useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function() {
  console.log('DB Connected');
});


// Passport for sigin in // 2
app.use(passport.initialize());
app.use(passport.session()); 

// Custom Middlewares // 3
app.use(function(req,res,next){
 res.locals.isAuthenticated = req.isAuthenticated();
 res.locals.currentUser = req.user;
 console.log(res.locals.currentUser);
 next();
})

// Add route middleware
app.use('/users', UserRouter);
app.use('/posts', PostRouter);
app.use('/signin', SigninRouter);


// Serve static assets
app.use(express.static(path.join(__dirname, 'assets')));

// Catch 404 error
app.use(function(req, res, next) {
  res.status(404);
  res.send('404: File Not Found');
});

// Set PORT
const PORT = process.env.PORT || 3000;

app.listen(PORT, function(){
  console.log(`Listening on port ${PORT}`);
});

