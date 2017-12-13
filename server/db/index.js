const path = require('path')
const fs = require('fs')
const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/doubanTop250',{useMongoClient:true})
// 此处防止 node.js - Mongoose: mpromise 错误
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connect error'))
db.once('open', function() {
    console.log('Mongodb started successfully')
})
let model = {}
const schemas = fs.readdirSync(path.resolve(__dirname, './model'))
schemas.forEach((file) => {
    let name = file.substring(0,file.lastIndexOf("."))
    let schema = require('./model/' + file)
    model[name] = mongoose.model(name, mongoose.Schema(schema))
})
module.exports = model