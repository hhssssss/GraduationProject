const express = require('express');
const router = express.Router();
const model = require('../db/index');
const fs = require("fs");
const path = require("path");
const formidable = require("formidable");

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
router.get("/getOneMovie",function (req,res,next) {
    let movie_id = req.param('movie_id');
    model.movie.findById(movie_id,function (err,doc) {
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
    });
});
router.get("/getImg",function (req,res,next) {
    let imgId = req.param('imgId');
    let read = fs.createReadStream(path.join(__dirname+'/../assets/movieImg',imgId));
    read.pipe(res)
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
router.get("/searchMovies",function (req,res,next) {
    let searchKey = req.param('searchKey');
    model.movie.find({name:new RegExp(".*" + searchKey + ".*","gim")},null,{limit:10}).exec(function (err,doc) {
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
router.post("/addMovie",function (req,res,next) {
    let form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.uploadDir = path.join(__dirname + "/../assets/movieImg");
    form.keepExtensions = true;//保留后缀
    form.maxFieldsSize = 2 * 1024 * 1024;
    form.parse(req,function (err, fields, files) {
        if(err){
            return console.log(err);
        }
        else{
            let movieInfo;
            if(fields.moviePictureFlag=='1'){
                let filesName = files.moviePicture.name,
                    filesType = files.moviePicture.type;
                if(/.(gif|jpg|jpeg|bmp|png)$/.exec(filesName)){  // 检测文件格式是否为gif,jpg,jpeg,bmp,png
                    let suffixName,
                        fullName,
                        newPath,
                        oldPath;
                    suffixName = /\w{1,4}$/.exec(filesType)[0]; // 获取后缀名
                    fullName = fields.name + '_' + new Date().getTime() + "." + suffixName;
                    newPath = path.join(form.uploadDir , `/${fullName}`);
                    oldPath = files.moviePicture.path;
                    fs.renameSync(oldPath, newPath);
                    movieInfo = {
                        ranking:fields.ranking,
                        name:fields.name,
                        grade:fields.grade,
                        title:fields.title,
                        alias:fields.alias,
                        director:fields.director,
                        image:fullName,
                        actor:fields.actor,
                        length:fields.length1,
                        language:fields.language,
                        time:fields.time,
                        genre:fields.genre,
                        country:fields.country,
                    }
                }else {
                    return  res.json({
                        status:0,
                        message:'文件不是图片类型'
                    })
                }
            }else {
                movieInfo = {
                    ranking:fields.ranking,
                    name:fields.name,
                    grade:fields.grade,
                    title:fields.title,
                    alias:fields.alias,
                    director:fields.director,
                    actor:fields.actor,
                    length:fields.length1,
                    language:fields.language,
                    time:fields.time,
                    image:'movieImg_1.jpg',
                    genre:fields.genre,
                    country:fields.country,
                }
            }
            model.movie.create(movieInfo, function(err){
                if (err) {
                    return  res.json({
                        status:0,
                        message:'添加失败'
                    })
                }
                else {
                    return  res.json({
                        status:1,
                        message:'添加成功'
                    })
                }
            })
        }
    });
});
router.post("/deleteMovie",function (req,res,next) {
    let _id = req.body._id;
    model.movie.remove({_id:_id},function (err) {
        if (err) {
            return  res.json({
                status:0,
                message:'删除失败'
            })
        }
        else {
            return  res.json({
                status:1,
                message:'删除成功'
            })
        }
    })
});
router.post("/updateMovie",function (req,res,next) {
    let form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.uploadDir = path.join(__dirname + "/../assets/movieImg");
    form.keepExtensions = true;//保留后缀
    form.maxFieldsSize = 2 * 1024 * 1024;
    form.parse(req,function (err, fields, files) {
        if(err){
            return console.log(err);
        }
        else{
            let movieInfo;
            if(fields.moviePictureFlag=='1'){
                let filesName = files.moviePicture.name,
                    filesType = files.moviePicture.type;
                if(/.(gif|jpg|jpeg|bmp|png)$/.exec(filesName)){  // 检测文件格式是否为gif,jpg,jpeg,bmp,png
                    let suffixName,
                        fullName,
                        newPath,
                        oldPath;
                    suffixName = /\w{1,4}$/.exec(filesType)[0]; // 获取后缀名
                    fullName = fields.name + '_' + new Date().getTime() + "." + suffixName;
                    newPath = path.join(form.uploadDir , `/${fullName}`);
                    oldPath = files.moviePicture.path;
                    fs.renameSync(oldPath, newPath);
                    movieInfo = {
                        ranking:fields.ranking,
                        name:fields.name,
                        grade:fields.grade,
                        title:fields.title,
                        alias:fields.alias,
                        director:fields.director,
                        image:fullName,
                        actor:fields.actor,
                        length:fields.length1,
                        language:fields.language,
                        time:fields.time,
                        genre:fields.genre,
                        country:fields.country,
                    }
                }else {
                    return  res.json({
                        status:0,
                        message:'文件不是图片类型'
                    })
                }
            }else {
                movieInfo = {
                    ranking:fields.ranking,
                    name:fields.name,
                    grade:fields.grade,
                    title:fields.title,
                    alias:fields.alias,
                    director:fields.director,
                    actor:fields.actor,
                    length:fields.length1,
                    language:fields.language,
                    time:fields.time,
                    genre:fields.genre,
                    country:fields.country,
                }
            }
            model.movie.update({_id:fields._id}, movieInfo, function(err, doc){
                if (err) {
                    return  res.json({
                        status:0,
                        message:'修改失败'
                    })
                }
                else {
                    return  res.json({
                        status:1,
                        message:'修改成功'
                    })
                }
            })
        }
    });
});
module.exports = router;
