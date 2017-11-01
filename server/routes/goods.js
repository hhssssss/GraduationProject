// var express = require('express');
// var router = express.Router();
// var mongoose = require('mongoose');
// var good = require('../models/good')
//
// mongoose.connect('mongodb://127.0.0.1:27017/test');
//
// mongoose.connection.on("connected",function () {
//     console.log("mongodb connected success");
// });
//
// mongoose.connection.on("error",function () {
//     console.log("mongodb connected fail");
// });
//
// mongoose.connection.on("disconnected",function () {
//     console.log("mongodb connected fail");
// });
//
// router.get("/",function (req,res,next) {
//     let sortFlag = req.param("sortFlag")
//     let goodslist = good.find({})
//     goodslist.sort({'salePrice':sortFlag});
//     goodslist.exec(function (err,doc) {
//         if(err){
//             res.json({
//                 status:'1',
//                 msg:err.message
//             })
//         }else {
//             res.json({
//                 status:'0',
//                 msg:'',
//                 result:{
//                     count:doc.length,
//                     list:doc
//                 }
//             })
//         }
//
//     })
// });
//
// module.exports = router;
