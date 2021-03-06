var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var shortComments = require('./routes/movieComments');
var users = require('./routes/users');
var movies = require('./routes/movies');
var mvoieComments = require('./routes/movieComments');
var filmReviews = require('./routes/filmReviews');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/shortComments', shortComments);
app.use('/users', users);
app.use('/movies', movies);
app.use('/movieComments', mvoieComments);
app.use('/filmReviews', filmReviews);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
//全局抓取错误防止服务器崩掉
process.on('uncaughtException', function(err){
    console.error('got an error: %s', err.message);
});
module.exports = app;
