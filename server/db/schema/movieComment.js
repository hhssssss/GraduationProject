const mongoose = require('mongoose');

let MovieCommentSchema = new mongoose.Schema({
    movieId : String,
    userId : String,
    user : {
        type: mongoose.Schema.ObjectId,
        ref: 'user'
    },
    time : {
        type : String,
        default : new Date().toLocaleString()
    },
    numberOfLike : {
        type : Number,
        default : '0'
    },
    comment : String,
    reply : [{
        type: mongoose.Schema.ObjectId,
        ref: 'movieCommentReply'
    }]
});

MovieCommentSchema.virtual('id').get(function () {
    return this.movieId + '_' + this.userId + '_' + this.time;
});

MovieCommentSchema.set('toJSON',{getters: true, virtual: true});

module.exports = MovieCommentSchema;