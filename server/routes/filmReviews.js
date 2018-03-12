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
                    img:'',
                    content:fields.filmReviewContent,
                    author:fields.user_id,
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

module.exports = router;
