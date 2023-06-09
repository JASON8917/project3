var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const mysql = require('mysql');

const connection = mysql.createConnection({
  host: '3.34.200.80',
  user : 'root',
  password : '1234',
  port : '50768',
  database : 'ManageSys'
});

var app = express();

connection.connect(function(err) {
  if (err) {
    console.error('Error connecting to MySQL database: ' + err.stack);
    return;
  }

  console.log('Connected to MySQL database as id ' + connection.threadId);
});

// view engine setup
app.set('views', path.join(__dirname, 'KWAS'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use('/KWAS', express.static(path.join(__dirname, 'KWAS')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
  res.sendFile(__dirname + '/KWAS/error.html');
});

module.exports = app;
