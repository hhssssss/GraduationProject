const express = require('express');
const formidable = require("formidable");
const path = require("path");
const fs = require("fs");
const router = express.Router();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    "userName" : String,
    "userId" : String,
    "userPwd" : String,
    "userGender" : String,
    "userSelfIntroduction" : String,
    "userLikeTypes" : String,
    "userProfilePicture" : String,
});
// mongoose.Promise = global.Promise;
let db = mongoose.createConnection('mongodb://127.0.0.1:27017/doubanTop250');

db.on("connected",function () {
    console.log("mongodb connected success");
});

db.on("error",function () {
    console.log("mongodb connected fail");
});

db.on("disconnected",function () {
    console.log("mongodb disconnected");
});
router.post("/register",function (req,res,next) {
    let user = db.model('user',userSchema,'users');
    let content = {
        userName:req.body.userId,
        userId:req.body.userId,
        userPwd:req.body.userPwd,
        userGender:'',
        userSelfIntroduction:'',
        userLikeTypes:'',
        userProfilePicture:'',
    };
    let userEntity = new user(content);
    user.find({userId:req.body.userId},function(err,doc){
        if(err){
            return res.json({
                status:'0',
                message:err.message
            })
        }else if(doc.length>0){
            return res.json({
                status:'0',
                message:'用户账号已被占用'
            })
        }else {
            userEntity.save(function(err){
                if(err){
                    return res.json({
                        status:'0',
                        message:err.message
                    })
                }else{
                    return res.json({
                        status:'1',
                        message:doc.length,
                        result:doc
                    })
                }
            });
        }
    });
});
router.post("/login",function (req,res,next) {
    let user = db.model('user',userSchema,'users');
    user.find({userId:req.body.userId,userPwd:req.body.userPwd},function(err,doc){
        if(err){
            return res.json({
                status:'0',
                message:err.message
            })
        }else if(doc.length>0){
            return res.json({
                status:'1',
                message:'登陆成功',
                result:doc,
            })
        }else {
            return res.json({
                status:'0',
                message:'登陆失败'
            })
        }
    });
});
router.post("/settings",function (req,res,next) {
    let form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.uploadDir = path.join(__dirname + "/../upload");
    form.keepExtensions = true;//保留后缀
    form.maxFieldsSize = 2 * 1024 * 1024;
    form.parse(req, function (err, fields, files){
        // let filename = files.profilePicture.name
        // let nameArray = filename.split('.');
        // let type = nameArray[nameArray.length - 1];
        // let name = '';
        // for (var i = 0; i < nameArray.length - 1; i++) {
        //     name = name + nameArray[i];
        // }
        // let date = new Date();
        // let time = '_' + date.getFullYear() + "_" + date.getMonth() + "_" + date.getDay() + "_" + date.getHours() + "_" + date.getMinutes()+ "_" + date.getSeconds()+ "_" + date.getMilliseconds();
        // let fullName = name + time + '.' + type;
        // let newPath = form.uploadDir + "/" + fullName;
        // fs.renameSync(files.profilePicture.path, newPath);  //重命名

        let imageBuf,imageBufBase64,userInfo;
        if(fields.profilePictureFlag=='1'){
            imageBuf = fs.readFileSync(files.profilePicture.path);
            imageBufBase64 = imageBuf.toString("base64");
            userInfo = {
                userName:fields.userName,
                userGender:fields.userGender,
                userLikeTypes:fields.userLikeTypes,
                userSelfIntroduction:fields.userSelfIntroduction,
                userProfilePicture:imageBufBase64,
            }
        }else{
            userInfo = {
                userName:fields.userName,
                userGender:fields.userGender,
                userLikeTypes:fields.userLikeTypes,
                userSelfIntroduction:fields.userSelfIntroduction,
            }
        }

        let user = db.model('user',userSchema,'users');
        user.update({userId:fields.userId}, userInfo, function(err, doc){
            if (err) {
                return res.json({
                    status:0,
                    message:'修改失败'
                })
            }
            else {
                return res.json({
                    status:1,
                    message:'修改成功',
                    doc:doc
                })
            }
        })
    })
});
router.get("/getUserInfo",function (req,res,next) {
    let user = db.model('user',userSchema,'users');
    user.find({userId:req.param("userId")},function(err,doc){
        if(err){
            return res.json({
                status:'0',
                message:err.message
            })
        }else if(doc.length>0){
            return res.json({
                status:'1',
                message:'获取信息成功',
                result:doc,
            })
        }else {
            return res.json({
                status:'0',
                message:'获取信息失败'
            })
        }
    });
});
module.exports = router;
