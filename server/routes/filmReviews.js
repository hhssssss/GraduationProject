const express = require('express');
const formidable = require("formidable");
const path = require("path");
const fs = require("fs");
const router = express.Router();
const model = require('../db/index');

router.post("/addFilmReview",function (req,res,next) {
    let form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.uploadDir = path.join(__dirname + "/../upload/filmReviewImg");
    form.keepExtensions = true;//保留后缀
    form.maxFieldsSize = 2 * 1024 * 1024;
    form.parse(req,function (err, fields, files) {
        if(err){
            return console.log(err);
        }
        else{
            let reviewInfo,
                filmReivew = model.filmReview,
                filmReviewEntity;
            if(fields.filmReviewImgFlag=='1'){
                let filesName = files.filmReviewImg.name,
                    filesType = files.filmReviewImg.type;
                if(/.(gif|jpg|jpeg|bmp|png)$/.exec(filesName)){  // 检测文件格式是否为gif,jpg,jpeg,bmp,png
                    let suffixName,
                        fullName,
                        newPath,
                        oldPath;
                    suffixName = /\w{1,4}$/.exec(filesType)[0]; // 获取后缀名
                    fullName = fields.user_id + '_' + new Date().getTime() + "." + suffixName;
                    newPath = path.join(form.uploadDir , `/${fullName}`);
                    oldPath = files.filmReviewImg.path;
                    fs.renameSync(oldPath, newPath);
                    reviewInfo = {
                        title:fields.filmReviewName,
                        label:fields.filmReviewLabel,
                        img:fullName,
                        content:fields.filmReviewContent,
                        author:fields.user_id,
                        random:Math.random(),
                    }
                }else {
                    return  res.json({
                        status:0,
                        message:'文件不是图片类型'
                    })
                }
            }else {
                reviewInfo = {
                    title:fields.filmReviewName,
                    label:fields.filmReviewLabel,
                    content:fields.filmReviewContent,
                    author:fields.user_id,
                    random:Math.random(),
                }
            }
            filmReviewEntity = new filmReivew(reviewInfo);
            filmReviewEntity.save(function (err) {
                if (err){
                    return  res.json({
                        status:0,
                        message:'添加失败'
                    })
                }else {
                    return  res.json({
                        status:1,
                        message:'添加成功'
                    })
                }
            })
        }
    })
});
router.get("/getImg",function (req,res,next) {
    let imgId = req.param('imgId');
    let read = fs.createReadStream(path.join(__dirname+'/../upload/filmReviewImg',imgId));
    read.pipe(res)
});
router.get("/getFilmReviews",function (req,res,next) {
    model.filmReview.find({}).limit(4).populate({path:'author',select:'userName'}).exec(function (err,doc) {
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
router.get("/searchFilmReviews",function (req,res,next) {
    let searchKey = req.param('searchKey');
    model.filmReview.find({$or:[
            {title:new RegExp(".*" + searchKey + ".*","gim")},
            {label:new RegExp(".*" + searchKey + ".*","gim")}]},null,{limit:4},function (err,doc) {
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
router.get("/getRandomFilmReviews",function (req,res,next) {
    let random = Math.random();
    model.filmReview.find({random : { $gte : random }},null,{limit:4},function (err,doc1) {
        if(err){
            return  res.json({
                status:'0',
                message:err.message
            })
        }
        else{
            if(doc1.length !== 0)
            {
                return  res.json({
                    status: '1',
                    message: doc1.length,
                    result:doc1,
                })
            }else if(doc1.length === 0){
                model.filmReview.find({random : { $lte : random }},null,{limit:4},function (err,doc2) {
                    if(err){
                        return  res.json({
                            status:'0',
                            message:err.message
                        })
                    }else {
                        return  res.json({
                            status: '1',
                            message: doc2.length,
                            result:doc2,
                        })
                    }
                });
            }
        }
    })
});
router.post("/addComment",function (req,res,next) {
    let filmReviewComment = model.filmReviewComment;
    let comment = {
        filmReview_id : req.body.filmReview_id,
        comment : req.body.comment,
        user : req.body.user_id
    }
    let filmReviewCommentEntity = new filmReviewComment(comment);
    filmReviewCommentEntity.save(function(err){
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
    });
});
router.get("/getComments",function (req,res,next) {
    let filmReview_id = req.param('filmReview_id');
    model.filmReviewComment.find({filmReview_id:filmReview_id}).limit(5).populate({path:'user',select:'userName userId userProfilePicture'}).exec(function (err,doc) {
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
module.exports = router;
