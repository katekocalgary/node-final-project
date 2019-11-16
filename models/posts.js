/* * * * * * * * * * * * * * * * * * *
DB Schema for data collection 'posts'
* * * * * * * * * * * * * * * * * * */
/* (2019-11-15, Kate Ko) */

const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
    {
        title : {
            type: String,
            required: true
        },
        author : {
            type: String,
            required: true
        },
        summary : {
            type: String,
            required: true
        },
        body : {
            type: String,
            required: true
        },
        slug : {
            type: String,
            required: true
        },
        date : {
            type : String,
            required: true
        }
    }
);

const Posts = mongoose.model('Posts', postSchema);

module.exports = Posts;