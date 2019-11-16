
/* * * * * * * * * * * * * * * * * * *
Router middleware for signin
* * * * * * * * * * * * * * * * * * */
/* (2019-11-15, Kate Ko) */

const express = require("express");
const SigninRouter = express.Router();
const passport= require("../config/passport"); // passport module to sign in
const Users = require('../models/users.js');


// // Get:/ - diplay signin page
// SigninRouter.get("/", function (req,res) {
//  const email = req.flash("email")[0];
//  const errors = req.flash("errors")[0] || {};
//  res.render("signin", {email: email , errors:errors , title: "sign in"});
// });


// Get:/ - diplay signin page
SigninRouter.get('/', function(req, res){
  res.render('signin',{title: "sign in"});
  console.log("get singin");
});

// Post:/ - check signin form data with passport module
// Code created with a-mean-blogger
// https://github.com/a-mean-blogger/board/tree/f17dc41dd2c38918104341c29c876a3a1cf82427

SigninRouter.post("/", passport.authenticate('local', {
  failureRedirect: "signin"
}), function(req, res){
  res.redirect("/posts");
});


// Logout 
SigninRouter.get("/signout", function(req, res) {
 req.logout();
 res.redirect("/");
});

module.exports = SigninRouter;