const mongoose = require('mongoose');

let MovieSchema = new mongoose.Schema({
    ranking : {
        type : String,
        unique : true
    },
    name : String,
    grade : String,
    title : String,
    alias : String,
    director :String,
    actor : String,
    length : String,
    language : String,
    time : String,
    genre : String,
    country : String,
    image : String,
});

module.exports = MovieSchema;