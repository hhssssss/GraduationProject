const express = require('express');
const router = express.Router();
const model = require('../db/index');

router.get("/getMovieCommentsByIndex",function (req,res,next) {
    let movieId = req.param('movieId');
    let index = parseInt(req.param('index'));
    model.movieComment.find({movieId:movieId}).skip(index).limit(5).populate({path:'user reply',select:'userName userId userProfilePicture comment time user numberOfLike',options:{sort:{'numberOfLikeLength':-1}},populate:{path:'user',select:'userName'}}).sort({numberOfLikeLength: -1,time:-1}).exec(function (err,doc) {
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
router.get("/getMovieCommentsByLength",function (req,res,next) {
    let movieId = req.param('movieId');
    let length = parseInt(req.param('length'));
    model.movieComment.find({movieId:movieId}).populate({path:'user reply',select:'userName userId userProfilePicture comment time user numberOfLike',options:{sort:{'numberOfLikeLength':-1}},populate:{path:'user',select:'userName'}}).sort({numberOfLikeLength: -1,time:-1}).limit(length).exec(function (err,doc) {
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
router.post("/addComment",function (req,res,next) {
    let movieComment = model.movieComment;
    let comment = {
        movieId : req.body.movieId,
        userId : req.body.userId,
        comment : req.body.comment,
        user : req.body.user_id,
        time:new Date().toLocaleString()
    }
    let movieCommentEntity = new movieComment(comment);
    movieCommentEntity.save(function(err){
        if (err) {
            return  res.json({
                status:0,
                message:'添加失败'
            })
        }
        else {
            return  res.json({
                status:1,
                message:'添加成功',
                result:movieCommentEntity._id,
            })
        }
        });
});
router.post("/addReply",function (req,res,next) {
    let movieCommentReply = model.movieCommentReply;
    let commentReply = {
        comment_id : req.body.comment_id,
        user : req.body.user_id,
        comment : req.body.comment,
    }
    let movieCommentReplyEntity = new movieCommentReply(commentReply);
    movieCommentReplyEntity.save(function(err){
        if (err) {
            return  res.json({
                status:0,
                message:'添加失败'
            })
        }
        else {
            model.movieComment.find({_id:req.body.comment_id},function(err,result){
                result[0].reply.push(movieCommentReplyEntity._id);
                result[0].save(function(err){
                    if(err){
                        return  res.json({
                            status:'0',
                            msg:err.message
                        })
                    }else {
                        return  res.json({
                            status:'1',
                            message:'添加成功',
                        })
                    }
                })
            })
        }
    });
});
router.get("/addNumberOfLike_comment",function (req,res,next) {
    let movieComment_id = req.param('movieComment_id');
    let user_id = req.param('user_id');
    model.movieComment.findById(movieComment_id,function (err,doc) {
        if(err){
            return  res.json({
                status:'0',
                msg:err.message
            })
        }else{
            let i = doc.numberOfLike.indexOf(user_id);
            if(i > -1){
                doc.numberOfLike.splice(i,1);
                doc.numberOfLikeLength -=1;
            }
            else {
                doc.numberOfLike.push(user_id);
                doc.numberOfLikeLength +=1;
            }
            doc.save(function (err) {
                if(err){
                    return  res.json({
                        status:'0',
                        msg:err.message,
                    })
                }else {
                    return  res.json({
                        status:'1',
                        message:'操作成功',
                    })
                }
            })
        }
    })
});
router.get("/addNumberOfLike_commentReply",function (req,res,next) {
    let movieCommentReply_id = req.param('movieCommentReply_id');
    let user_id = req.param('user_id');
    model.movieCommentReply.find({_id:movieCommentReply_id},function (err,doc) {
        if(err){
            return  res.json({
                status:'0',
                msg:err.message
            })
        }else{
            let i = doc[0].numberOfLike.indexOf(user_id);
            if(i > -1){
                doc[0].numberOfLike.splice(i,1);
                doc[0].numberOfLikeLength -=1;
            }
            else {
                doc[0].numberOfLike.push(user_id);
                doc[0].numberOfLikeLength +=1;
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
                    })
                }
            })
        }
    })
});
module.exports = router;
