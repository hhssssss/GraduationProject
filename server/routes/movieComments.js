const express = require('express');
const router = express.Router();
const model = require('../db/index');

router.get("/five",function (req,res,next) {
    let movieId = req.param('movieId');
    model.movieComment.find({movieId:movieId}).limit(5).populate({path:'user reply',select:'userName userId userProfilePicture comment time user numberOfLike',populate:{path:'user',select:'userName'}}).exec(function (err,doc) {
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
        user : req.body.user_id
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
                message:'添加成功'
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
                result.reply.push(movieCommentReplyEntity._id);
                result.save(function(err){
                    console.log(err.message);
                })
            })
            return  res.json({
                status:1,
                message:'添加成功'
            })
        }
    });
});
module.exports = router;
