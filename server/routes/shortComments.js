const express = require('express');
const router = express.Router();
const model = require('../db/index');

router.get("/two",function (req,res,next) {
    let movieId = req.param('movieId');
    let shortCommentsQuery = model.shortComment.find({movieId:movieId});
    shortCommentsQuery.limit(2).exec(function (err,doc) {
        if(err){
            return  res.json({
                status:'0',
                msg:err.message
            })
        }else{
            console.log(doc)
            return  res.json({
                status:'1',
                message:doc.length,
                result:doc
            })
        }
    })
});
router.post("/addComment",function (req,res,next) {
    // let comment = {
    //     // userImg : req.body.userImg,
    //     userId : req.body.userId,
    //     userName : req.body.userName,
    //     comment : req.body.comment,
    //     time : req.body.time,
    //     admireNumber : '0',
    //     reply : []
    // }
    // console.log(req.body)
    // model.shortComment.update({movieId:req.body.movieId},{$push:{comments:comment}},function(err,doc){
    //     if (err) {
    //         return  res.json({
    //             status:0,
    //             message:'添加失败'
    //         })
    //     }
    //     else {
    //         console.log(doc)
    //         return  res.json({
    //             status:1,
    //             message:'添加成功'
    //         })
    //     }
    //     });
});
module.exports = router;
