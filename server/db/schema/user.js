const mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
    userName : String,
    userId : {
        type : String,
        unique : true
    },
    userPwd : String,
    userGender : String,
    userSelfIntroduction : String,
    userLikeTypes : String,
    userProfilePicture : {
        type : String,
        default : 'defaultUserImg.png'
    },
    collections : [{
        type: mongoose.Schema.ObjectId,
        ref: 'movie'
    }],
    filmReviewCollections : [{
        type: mongoose.Schema.ObjectId,
        ref: 'filmReview'
    }],
    signIn : [String],
    coins :{
        type : Number,
        default : 0,
    },
    admin : {
        type : Boolean,
        default : 0
    },
});

module.exports = UserSchema;