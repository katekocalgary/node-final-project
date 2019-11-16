/* * * * * * * * * * * * * * * * * * *
Router middleware for post
* * * * * * * * * * * * * * * * * * */
/* (2019-11-15, Kate Ko) */

const express = require('express');
const PostRouter = express.Router();
const Posts = require('../models/posts.js');
const slugify = require('slugify'); // Module to convert space to '-' in slug
const moment = require('moment'); // Module to fix date format



// Get:/ - diplay posts page
PostRouter.get("/", async function(req, res, next){
    try{
        const posts = await Posts.find({}); 
        res.render('post', {posts: posts, title: "Today I Learned"});
    } catch(err) {
        return res.status(500).send(err);
    }
})

// Get : posts/post-form - form page
PostRouter.get('/post-form', function(req, res){
    res.render('post-form',{title: "Post TIL"});
  });
  

// Post : posts/post-form - form data insert to db
PostRouter.post('/', function(req, res){

    const posts = new Posts();
    posts.title = req.body.title;
    posts.summary = req.body.summary;
    posts.author = req.body.author;
    posts.body = req.body.body; 
    posts.date = moment().format('MM/DD/YYYY') // using moment module for date format
    posts.slug = slugify(req.body.slug); //using slugify module for converting space to '-'
    // Improvement point : need to check slug unique before slug data insert to the db

    posts.save(function(err){
        if(err) {
            console.log(err);
            // display fail message and stay same page
            req.flash('postFailMsg', 'Sorry, Something went wrong while posting. Please, try again.');
            res.redirect('/posts/post-form');
        }
        else{
            // display thank you message and page
            req.flash('postSuccessMsg',`Thank you for new posting!`);
            res.redirect('/posts');
        }
    });
});


// Get :/post/:slug - find post by slug and then display view 
// Code created with Yun-hyunyoung's Nodejs-board-sample 
// https://github.com/Yun-hyunyoung/Nodejs-board-sample

PostRouter.get('/post-detail/:slug', function(req, res){
    console.log("post get one")
    Posts.findOne({slug : req.params.slug}, function (err, posts){
        res.render('post-detail', {posts: posts, title: "Today I Learned"});
    })
});

module.exports = PostRouter;


