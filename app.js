var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var homeRouter = require('./routes/Home-page');
var contactRouter = require('./routes/Contact-us');
var ServicesRouter = require('./routes/Our-services');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

const timeNow=(req, res, next)=>{
  let t =(Date().toLocaleString()).slice(16, 18);
  console.log(t);
  if (t>17 || t<9){
    res.send('WE ARE OPEN FROM 9 TO 5');
  }
  next();
}

app.use(timeNow);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));




app.use('/', homeRouter);
app.use('/Contact-us', contactRouter);
app.use('/Our-services', ServicesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
