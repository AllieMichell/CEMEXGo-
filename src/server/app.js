const createError = require('http-errors');
const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
/** @ROUTES_CONTROLLERS_MODELS */
const userRouter = require('../server/routes/userRoutes');
const commentsRouter = require('../server/routes/commentsRoutes');

let mongoDB = 'mongodb://localhost:27017/Find-Eat';

const app = express();
app.use(cors());
// Mongoose conection
mongoose.connect(
  mongoDB,
  {useNewUrlParser: true, useCreateIndex: true},
  (err)=>{
      if(err){
          console.log(err)
      }else{
          console.log('Success conected')
      }
  }
);
// view engine setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('dist'));

/** @CONTROLLERS_MODELS */
app.use('/findeat/api/user', userRouter);
app.use('/handnote/api/comment', commentsRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});
// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
