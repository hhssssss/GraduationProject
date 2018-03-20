const mongoose = require('mongoose');

let filmReviewSchema = new mongoose.Schema({
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
    collected : [{
        type: mongoose.Schema.ObjectId,
        ref: 'user'
    }],
    random : Number
});

module.exports = filmReviewSchema;