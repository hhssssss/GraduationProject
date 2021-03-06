const mongoose = require('mongoose');

let MovieCommentReplySchema = new mongoose.Schema({
    comment_id : String,
    user : {
        type: mongoose.Schema.ObjectId,
        ref: 'user'
    },
    time : {
        type : String,
        default : new Date().toLocaleString()
    },
    numberOfLike : [{
        type: mongoose.Schema.ObjectId,
        ref: 'user'
    }],
    numberOfLikeLength :{
        type: Number,
        default: 0
    },
    comment : String,
});

module.exports = MovieCommentReplySchema;