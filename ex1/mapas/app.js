var createError = require('http-errors');
var express = require('express');
var logger = require('morgan');

var indexRouter = require('./routes/index');

var app = express();

// fazer ligação com mongo
var mongoose = require('mongoose')
var mongoDB = 'mongodb://127.0.0.1/MAPA2022'
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true})

var db = mongoose.connection

db.on('error', function(){
  console.log('Erro na conexão do MongoDB...')
})
db.once('open', function(){
  console.log('Conexão ao MongoDB realizada com sucesso!')
})

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', indexRouter);

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
  res.status(err.status || 500).jsonp({error: err.message})
});

module.exports = app;