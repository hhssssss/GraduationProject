var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
// const user = require('../models/user');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    "userName" : String,
    "userId" : String,
    "userPwd" : String,
});

router.get("/",function (req,res,next) {
    mongoose.Promise = global.Promise;
    var db = mongoose.createConnection('mongodb://127.0.0.1:27017/doubanTop250');

    db.on("connected",function () {
        console.log("mongodb-doubanTop250 connected success");
    });

    db.on("error",function () {
        console.log("mongodb-doubanTop250 connected fail");
    });

    db.on("disconnected",function () {
        console.log("mongodb-doubanTop250 disconnected");
    });
    let user = db.model('user',userSchema,'users');
    let content = {userName:"Nick",userId:req.param("userId"),userPwd:req.param("userPwd")};
    let userEntity = new user(content);
    user.find({userId:req.param("userId")},function(err,doc){
        if(err){
            res.json({
                status:'0',
                message:err.message
            })
        }else if(doc.length>0){
            res.json({
                status:'0',
                message:'用户账号已被占用'
            })
        }else {
            userEntity.save(function(err){
                if(err){
                    console.log(err);
                    res.json({
                        status:'0',
                        message:err.message
                    })
                }else{
                    console.log('成功插入数据');
                    res.json({
                        status:'1',
                        message:doc.length,
                        result:doc
                    })
                }
                db.close();
            });
            console.log(123)
        }
    });
});
router.get("/login",function (req,res,next) {
    mongoose.Promise = global.Promise;
    var db = mongoose.createConnection('mongodb://127.0.0.1:27017/doubanTop250');

    db.on("connected",function () {
        console.log("mongodb-doubanTop250 connected success");
    });

    db.on("error",function () {
        console.log("mongodb-doubanTop250 connected fail");
    });

    db.on("disconnected",function () {
        console.log("mongodb-doubanTop250 disconnected");
    });
    let user = db.model('user',userSchema,'users');
    user.find({userId:req.param("userId"),userPwd:req.param("userPwd")},function(err,doc){
        if(err){
            res.json({
                status:'0',
                message:err.message
            })
        }else if(doc.length>0){
            res.json({
                status:'1',
                message:'登陆成功'
            })
        }else {
            res.json({
                status:'0',
                message:'登陆失败'
            })
        }
        db.close();
    });
});
module.exports = router;
