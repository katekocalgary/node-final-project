
/* * * * * * * * * * * * * * * * * * *
Passport module for sign in 
* * * * * * * * * * * * * * * * * * */
/* (2019-11-15, Kate Ko) */


const passport   = require("passport");
const LocalStrategy = require("passport-local").Strategy; // 1
const Users = require('../models/users.js');

// Code created with ZeroCho's nodejs-book 
//https://github.com/ZeroCho/nodejs-book/blob/master/ch9/9.3/nodebird/passport/localStrategy.js

// local strategy // 2
passport.use(new LocalStrategy({
   usernameField : "email", // 3-1
   passwordField : "password", // 3-1
   passReqToCallback : true
  },
  function(req, email, password, done) { // 3-2
   Users.findOne({email:email}, function(findError, user) {
      if (findError) {
       return done(findError);
      }
      if(!user) {
        req.flash("signin", "Oops, email or password is incorrect. Please try again.");
        return done(null,false);
      } else {
        return user.comparePassword(password, function(passError, isMatch){
          if (isMatch) {
            return done(null, user); 
          }
          req.flash("signin", "Oops, email or password is incorrect. Please try again.");
          return done(null, false)
        })
      }
    })
  }
))

// serialize & deserialize User // 4
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(user, done) {
 done(null, user);
});




module.exports = passport;