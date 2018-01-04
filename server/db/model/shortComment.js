module.exports = {
    "movieId" : String,
    "comments":[
        {
            "userImg" : String,
            "userId" : String,
            "userName" : String,
            "comment" : String,
            "time" : String,
            "admireNumber" : String,
            "reply":[
                {
                    "userId" : String,
                    "userName" : String,
                    "comment" : String,
                    "time" : String,
                    "admireNumber" : String
                }
            ],
        }
    ]
}