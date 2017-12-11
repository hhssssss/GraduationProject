const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let movieSchema = new Schema({
    "ranking" : String,
    "name" : String,
    "grade" : String,
    "title" : String,
    "alias" : String,
    "director" :String,
    "actor" : String,
    "length" : String,
    "language" : String,
    "time" : String,
    "genre" : String,
    "country" : String,
    "image" : String,
});

let db = mongoose.createConnection('mongodb://127.0.0.1:27017/doubanTop250');

db.on("connected",function () {
    console.log("mongodb connected success");
});

db.on("error",function () {
    console.log("mongodb connected fail");
});

db.on("disconnected",function () {
    console.log("mongodb disconnected");
});

router.get("/",function (req,res,next) {
    let pageId = req.param('pageId');
    let movie = db.model('movie',movieSchema,'movies');
    let movieQuery = movie.find({});
    movieQuery.limit(10).skip(pageId*10).exec(function (err,doc) {
        if(err){
            res.json({
                status:'0',
                msg:err.message
            })
        }else{
            res.json({
                status:'1',
                message:doc.length,
                result:doc
            })
        }
    })
});
router.get("/search",function (req,res,next) {
    let searchKey = req.param('searchKey');
    let movie = db.model('movie',movieSchema,'movies');
    let movieQuery = movie.find({$or:[
        {name:new RegExp(".*" + searchKey + ".*","gim")},
        {title:new RegExp(".*" + searchKey + ".*","gim")},
        {alias:new RegExp(".*" + searchKey + ".*","gim")},
        {director:new RegExp(".*" + searchKey + ".*","gim")},
        {actor:new RegExp(".*" + searchKey + ".*","gim")},
        {genre:new RegExp(".*" + searchKey + ".*","gim")},
        {time:new RegExp(".*" + searchKey + ".*","gim")},
        {country:new RegExp(".*" + searchKey + ".*","gim")},
        {language:new RegExp(".*" + searchKey + ".*","gim")}]},function (err,doc) {
        if(err){
            res.json({
                status:'0',
                message:err.message
            })
        }
        else
        {
            res.json({
                status: '1',
                message: doc.length,
                result:doc,
            })
        }
    })
});
module.exports = router;
