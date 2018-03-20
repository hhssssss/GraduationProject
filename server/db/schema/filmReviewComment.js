const mongoose = require('mongoose');

let FilmReviewCommentSchema = new mongoose.Schema({
    filmReview_id : String,
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
    comment : String,
});

module.exports = FilmReviewCommentSchema;