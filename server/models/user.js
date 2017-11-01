const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    "userName" : String,
    "userId" : String,
    "userPwd" : String,
});

module.exports = mongoose.model('user',userSchema,'users');