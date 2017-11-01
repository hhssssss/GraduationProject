const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
// const movie = require('../models/movie');
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

router.get("/",function (req,res,next) {
    let db = mongoose.createConnection('mongodb://127.0.0.1:27017/doubanTop250');

    db.on("connected",function () {
        console.log("mongodb-doubanTop250 connected success");
    });

    db.on("error",function () {
        console.log("mongodb-doubanTop250 connected fail");
    });

    db.on("disconnected",function () {
        console.log("mongodb-doubanTop250 disconnected");
    });

    let movie = db.model('movie',movieSchema,'movies')
    movie.find({},function (err,doc) {
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
        db.close();
    })
});

module.exports = router;
