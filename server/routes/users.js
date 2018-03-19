const express = require('express');
const formidable = require("formidable");
const path = require("path");
const fs = require("fs");
const router = express.Router();
const model = require('../db/index');

router.post("/register",function (req,res,next) {
    let user = model.user;
    let content = {
        userName:req.body.userId,
        userId:req.body.userId,
        userPwd:req.body.userPwd,
    };
    let userEntity = new user(content);
    user.find({userId:req.body.userId},function(err,doc){
        if(err){
            return  res.json({
                        status:'0',
                        message:err.message
                    })
        }else if(doc.length>0){
            return  res.json({
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
                            message:'注册成功',
                        })
                }
            });
        }
    });
});
router.post("/login",function (req,res,next) {
    model.user.find({userId:req.body.userId,userPwd:req.body.userPwd},function(err,doc){
        if(err){
            return  res.json({
                        status:'0',
                        message:err.message
                    })
        }else if(doc.length>0){
            return  res.json({
                        status:'1',
                        message:'登陆成功',
                        result:doc
                    })
        }else {
            return  res.json({
                        status:'0',
                        message:'登陆失败'
                    })
        }
    });
});
router.get("/getImg",function (req,res,next) {
    let imgId = req.param('imgId');
    let read = fs.createReadStream(path.join(__dirname+'/../upload/userImg',imgId));
    read.pipe(res)
});
router.post("/settings",function (req,res,next) {
    let form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.uploadDir = path.join(__dirname + "/../upload/userImg");
    form.keepExtensions = true;//保留后缀
    form.maxFieldsSize = 2 * 1024 * 1024;
    form.parse(req,function (err, fields, files) {
        if(err){
            return console.log(err);
        }
        else{
            let userInfo;
            if(fields.profilePictureFlag=='1'){
                let filesName = files.profilePicture.name,
                    filesType = files.profilePicture.type;
                if(/.(gif|jpg|jpeg|bmp|png)$/.exec(filesName)){  // 检测文件格式是否为gif,jpg,jpeg,bmp,png
                    let suffixName,
                        fullName,
                        newPath,
                        oldPath;
                    suffixName = /\w{1,4}$/.exec(filesType)[0]; // 获取后缀名
                    fullName = fields.user_id + '_' + new Date().getTime() + "." + suffixName;
                    newPath = path.join(form.uploadDir , `/${fullName}`);
                    oldPath = files.profilePicture.path;
                    fs.renameSync(oldPath, newPath);
                    userInfo = {
                        userName:fields.userName,
                        userGender:fields.userGender,
                        userLikeTypes:fields.userLikeTypes,
                        userSelfIntroduction:fields.userSelfIntroduction,
                        userProfilePicture:fullName,
                    }
                }else {
                    return  res.json({
                        status:0,
                        message:'文件不是图片类型'
                    })
                }
            }else {
                userInfo = {
                    userName:fields.userName,
                    userGender:fields.userGender,
                    userLikeTypes:fields.userLikeTypes,
                    userSelfIntroduction:fields.userSelfIntroduction,
                }
            }
            model.user.update({userId:fields.userId}, userInfo, function(err, doc){
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
    // form.parse(req, function (err, fields, files){
    //     let imageBuf,imageBufBase64,userInfo;
    //     if(fields.profilePictureFlag=='1'){
    //         imageBuf = fs.readFileSync(files.profilePicture.path);
    //         imageBufBase64 = imageBuf.toString("base64");
    //         userInfo = {
    //             userName:fields.userName,
    //             userGender:fields.userGender,
    //             userLikeTypes:fields.userLikeTypes,
    //             userSelfIntroduction:fields.userSelfIntroduction,
    //             userProfilePicture:imageBufBase64,
    //         }
    //     }else{
    //         userInfo = {
    //             userName:fields.userName,
    //             userGender:fields.userGender,
    //             userLikeTypes:fields.userLikeTypes,
    //             userSelfIntroduction:fields.userSelfIntroduction,
    //         }
    //     }
    //
    //     model.user.update({userId:fields.userId}, userInfo, function(err, doc){
    //         if (err) {
    //             return  res.json({
    //                 status:0,
    //                 message:'修改失败'
    //             })
    //         }
    //         else {
    //             return  res.json({
    //                 status:1,
    //                 message:'修改成功'
    //             })
    //         }
    //     })
    // });
});
router.get("/getUserInfo",function (req,res,next) {
    model.user.find({userId:req.param("userId")},function(err,doc){
        if(err){
            return  res.json({
                        status:'0',
                        message:err.message
                    })
        }else if(doc.length>0){
            return  res.json({
                        status:'1',
                        message:'获取信息成功',
                        result:doc,
                    })
        }else {
            return  res.json({
                        status:'0',
                        message:'获取信息失败'
                    })
        }
    });
});
router.get("/addCollections",function (req,res,next) {
    let movie_id = req.param('movie_id');
    let user_id = req.param('user_id');
    model.user.find({_id:user_id},function (err,doc) {
        if(err){
            return  res.json({
                status:'0',
                msg:err.message
            })
        }else{
            let i = doc[0].collections.indexOf(movie_id);
            if(i > -1){
                doc[0].collections.splice(i,1);
            }
            else {
                doc[0].collections.push(movie_id);
            }
            doc[0].save(function (err) {
                if(err){
                    return  res.json({
                        status:'0',
                        msg:err.message
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
router.get("/addFilmReviewCollections",function (req,res,next) {
    let filmReview_id = req.param('filmReview_id');
    let user_id = req.param('user_id');
    model.user.find({_id:user_id},function (err,doc) {
        if(err){
            return  res.json({
                status:'0',
                msg:err.message
            })
        }else{
            let i = doc[0].filmReviewCollections.indexOf(filmReview_id);
            if(i > -1){
                doc[0].filmReviewCollections.splice(i,1);
            }
            else {
                doc[0].filmReviewCollections.push(filmReview_id);
            }
            doc[0].save(function (err) {
                if(err){
                    return  res.json({
                        status:'0',
                        msg:err.message
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
