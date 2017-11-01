const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let movieSchema = new Schema({
    "ranking" : String,
    "image" : String,
    "CnName" : String,
    "EnName" : String,
    "information" : String,
    "rating" : String,
    "describe" : String,
});

module.exports = mongoose.model('movie',movieSchema,'movies');