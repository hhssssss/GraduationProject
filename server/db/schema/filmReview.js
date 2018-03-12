const mongoose = require('mongoose');

let MovieSchema = new mongoose.Schema({
    title : String,
    label : String,
    img : String,
    content : String,
    time : {
        type : String,
        default : new Date().toLocaleString()
    },
    author : {
        type: mongoose.Schema.ObjectId,
        ref: 'user'
    }
});

module.exports = MovieSchema;