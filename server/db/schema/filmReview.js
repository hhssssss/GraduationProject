const mongoose = require('mongoose');

let MovieSchema = new mongoose.Schema({
    title : String,
    label : String,
    img : {
        type : String,
        default : 'defaultFilmReviewImg.png'
    },
    content : String,
    time : {
        type : String,
        default : new Date().toLocaleString()
    },
    author : {
        type: mongoose.Schema.ObjectId,
        ref: 'user'
    },
    random : Number
});

module.exports = MovieSchema;