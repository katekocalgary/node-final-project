/* * * * * * * * * * * * * * * * * * *
DB Schema for data collection 'users' 
* * * * * * * * * * * * * * * * * * */
/* (2019-11-15, Kate Ko) */

const mongoose = require('mongoose');
// const bcrypt = require("bcrypt");
// Improvement point : password encoding

const userSchema = new mongoose.Schema(
    {
        name : {
            type: String,
            required: true
        },
        password : {
            type: String,
            required: true
        },
        email : {
            type: String,
            required: true
        },
        adult : {
            type : Boolean,
            default : false
        },
    }
);


// compare password between signin password and db password
userSchema.methods.comparePassword = function(inputPassword, cb) {
    if (inputPassword === this.password) {
        cb(null, true)
    } else {
        cb('error');
    }
};


const Users = mongoose.model('Users', userSchema);

module.exports = Users;