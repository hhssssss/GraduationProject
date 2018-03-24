const mongoose = require('mongoose');

let MovieCommentSchema = new mongoose.Schema({
    movieId : String,
    userId : String,
    user : {
        type: mongoose.Schema.ObjectId,
        ref: 'user'
    },
    time :String,
    numberOfLike :  [{
        type: mongoose.Schema.ObjectId,
        ref: 'user'
    }],
    numberOfLikeLength :{
        type: Number,
        default: 0
    },
    comment : String,
    reply : [{
        type: mongoose.Schema.ObjectId,
        ref: 'movieCommentReply'
    }]
});

// MovieCommentSchema.virtual('numberOfLikeLength').get(function () {
//     return this.numberOfLike.length;
// });
//
// MovieCommentSchema.set('toJSON',{getters: true, virtual: true});

module.exports = MovieCommentSchema;