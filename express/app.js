var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var physicsRouter = require('./routes/physics');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/dist', express.static(path.join(__dirname, '../reveal.js/dist')));
app.use('/plugin', express.static(path.join(__dirname, '../reveal.js/plugin')));
app.use('/img', express.static(path.resolve(__dirname, '../img')));
app.use('/', indexRouter);
app.use('/physics', physicsRouter);
app.get('/data', function(req, res) {
  res.render('data', {title: 'IGCSE PHYSICS'});
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  // next(createError(404));
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

module.exports = app;
