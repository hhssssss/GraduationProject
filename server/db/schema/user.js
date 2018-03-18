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
    userProfilePicture : String,
    collections : [String],
    filmReviewCollections : [String]
});

module.exports = UserSchema;