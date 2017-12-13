const express = require('express');
const router = express.Router();
const model = require('../db/index');

router.get("/",function (req,res,next) {
    let pageId = req.param('pageId');
    let movieQuery = model.movie.find({});
    movieQuery.limit(10).skip(pageId*10).exec(function (err,doc) {
        if(err){
            return  res.json({
                        status:'0',
                        msg:err.message
                    })
        }else{
            return  res.json({
                        status:'1',
                        message:doc.length,
                        result:doc
                    })
        }
    })
});
router.get("/search",function (req,res,next) {
    let searchKey = req.param('searchKey');
    model.movie.find({$or:[
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
            return  res.json({
                        status:'0',
                        message:err.message
                    })
        }
        else{
            return  res.json({
                        status: '1',
                        message: doc.length,
                        result:doc,
                    })
        }
    })
});
module.exports = router;
