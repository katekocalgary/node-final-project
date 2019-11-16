/* * * * * * * * * * * * * * * * * * *
Router middleware for users
* * * * * * * * * * * * * * * * * * */
/* (2019-11-15, Kate Ko) */


const express = require('express');
const UserRouter = express.Router();
const Users = require('../models/users.js');


// Message display using express-flash, cookie-parser, express-session middleware
// Code created with below  
// http://www.coding4developers.com/node-js/send-message-on-redirect-in-node-js-redirect-with-message-node-js-flash-message-in-node-js/
// https://gist.github.com/brianmacarthur/a4e3e0093d368aa8e423


// Get:/ - display signup page
UserRouter.get('/', function(req, res){
    res.render('signup',{title: "sign up"});
    console.log("get singup");
  });


// Get: users/thanks - display thanks page
UserRouter.get('/thanks', function(req, res) {
    res.render('thanks', {title: "Thanks"});
});

// Post:/- Accepts post data from sign up page and create in the users db
UserRouter.post('/', function(req, res){

    // create a record into MongodDB Atlas via mongoose model
    const users = new Users(req.body);
    //Improvement point : checking unique email before insert to the DB

    users.save(function(err){
        // error: redirect back to signup with fail message
        if(err) {
            console.log(err);
            req.flash('subFailMsg', 'Sorry, Something went wrong while signing up. Please, try again.');
            res.redirect('/users');
        }

        // Get Thank you page
        else {
            console.log("thanks");
            const name = req.body.name
            console.log(name);
            req.flash('subSuccessMsg',`${name}`);
            res.redirect('/users/thanks');
        } 
    });
});

module.exports = UserRouter;