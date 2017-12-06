var express = require('express');
var formidable = require("formidable"); //载入 formidable
var path = require("path");
var fs = require("fs");
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
router.post("/settings",function (req,res,next) {
    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.uploadDir = path.join(__dirname + "/../upload");
    form.keepExtensions = true;//保留后缀
    form.maxFieldsSize = 2 * 1024 * 1024;
    form.parse(req, function (err, fields, files){
        console.log(files.profilePicture);
        var filename = files.profilePicture.name
        var nameArray = filename.split('.');
        var type = nameArray[nameArray.length - 1];
        var name = '';
        for (var i = 0; i < nameArray.length - 1; i++) {
            name = name + nameArray[i];
        }
        var date = new Date();
        var time = '_' + date.getFullYear() + "_" + date.getMonth() + "_" + date.getDay() + "_" + date.getHours() + "_" + date.getMinutes();
        var avatarName = name + time + '.' + type;
        var newPath = form.uploadDir + "/" + avatarName;
        fs.renameSync(files.profilePicture.path, newPath);  //重命名
        res.send({data:"/upload/"+avatarName})
    })
});
module.exports = router;
