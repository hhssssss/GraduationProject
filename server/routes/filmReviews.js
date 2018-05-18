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
            if(!fields.coins){
             fields.coins = 0;
            }
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
                        coins:fields.coins,
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
                    coins:fields.coins,
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
                        message:'添加成功',
                        result:filmReviewEntity._id,
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
router.get("/getOneFilmReview",function (req,res,next) {
    let filmReview_id = req.param('filmReview_id');
    model.filmReview.findById(filmReview_id).populate({path:'author',select:'userName'}).exec(function (err,doc) {
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
            {label:new RegExp(".*" + searchKey + ".*","gim")}]},null,{limit:4}).populate({path:'author',select:'userName'}).exec(function (err,doc) {
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
    model.filmReview.find({random : { $gte : random }},null,{limit:4}).populate({path:'author',select:'userName'}).exec(function (err,doc1) {
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
        user : req.body.user_id,
        time:new Date().toLocaleString()
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
    model.filmReviewComment.find({filmReview_id:filmReview_id}).limit(5).populate({path:'user',select:'userName userId userProfilePicture'}).sort({numberOfLikeLength: -1,time:-1}).exec(function (err,doc) {
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
router.get("/addNumberOfLike_comment",function (req,res,next) {
    let comment_id = req.param('comment_id');
    let user_id = req.param('user_id');
    model.filmReviewComment.find({_id:comment_id},function (err,doc) {
        if(err){
            return  res.json({
                status:'0',
                msg:err.message
            })
        }else{
            let i = doc[0].numberOfLike.indexOf(user_id);
            if(i > -1){
                doc[0].numberOfLike.splice(i,1);
                doc[0].numberOfLikeLength -= 1;
            }
            else {
                doc[0].numberOfLike.push(user_id);
                doc[0].numberOfLikeLength += 1;
            }
            doc[0].save(function (err) {
                if(err){
                    return  res.json({
                        status:'0',
                        msg:err.message,
                    })
                }else {
                    return  res.json({
                        status:'1',
                        message:'操作成功',
                        result:doc[0].numberOfLike.length,
                    })
                }
            })
        }
    })
});
router.get("/getMyFilmReviews",function (req,res,next) {
    let user_id = req.param('user_id');
    model.filmReview.find({author:user_id},{'title':1,'img':1,'_id':1},{limit:6},function (err,doc) {
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
router.get("/getMyFilmReviewsByIndex",function (req,res,next) {
    let user_id = req.param('user_id');
    let index = parseInt(req.param('index'));
    model.filmReview.find({author:user_id},{'title':1,'img':1,'_id':1},{limit:6,skip:index},function (err,doc) {
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
router.post("/deleteFilmReview",function (req,res,next) {
    let filmReview_id = req.body.filmReview_id;
    model.filmReview.remove({_id:filmReview_id},function (err) {
        if(err){
            return  res.json({
                status:'0',
                msg:err.message
            })
        }else{
            model.filmReviewComment.remove({filmReview_id:filmReview_id},function (err) {
                if(err){
                    return  res.json({
                        status:'0',
                        msg:err.message
                    })
                }else {
                    return res.json({
                        status:'1',
                        msg:'删除成功',
                        result:''
                    })
                }
            })
        }
    })
});
router.get("/",function (req,res,next) {
    let pageId = req.param('pageId');
    model.filmReview.find({}).limit(10).populate({path:'author',select:'userName'}).skip(pageId*10).exec(function (err,doc) {
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
router.get("/searchFilmReviews10",function (req,res,next) {
    let searchKey = req.param('searchKey');
    model.filmReview.find({title:new RegExp(".*" + searchKey + ".*","gim")},null,{limit:10}).populate({path:'author',select:'userName'}).exec(function (err,doc) {
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
router.post("/deleteFilmReviewByAdmin",function (req,res,next) {
    let _id = req.body._id;
    model.filmReview.remove({_id:_id},function (err) {
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
router.post("/updateFilmReview",function (req,res,next) {
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
            if(!fields.coins){
                fields.coins = 0;
            }
            let reviewInfo;
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
                        coins:fields.coins,
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
                    coins:fields.coins,
                }
            }
            model.filmReview.update({_id:fields._id}, reviewInfo, function(err, doc){
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
    })
});
module.exports = router;
