const mongoose = require('mongoose');

let FilmReviewCommentSchema = new mongoose.Schema({
    filmReview_id : String,
    user : {
        type: mongoose.Schema.ObjectId,
        ref: 'user'
    },
    time : String,
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

module.exports = FilmReviewCommentSchema;