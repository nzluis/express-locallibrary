var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const engine = require('ejs-blocks')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const catalogRouter = require("./routes/catalog"); //Import routes for "catalog" area of site
const compression = require("compression");
const helmet = require("helmet");

var app = express();

app.use(helmet());

// Set up mongoose connection
const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
const mongoDB = "mongodb+srv://luisnavarrofs:Stphm4tCGnTSBtqh@cluster0.i2iw6nt.mongodb.net/localLibrary?retryWrites=true&w=majority";

main().catch(err => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression()); // Compress all routesnpm install helmet

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/catalog', catalogRouter)

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
