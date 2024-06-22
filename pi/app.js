var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')
const db = require('./database/models');
const Usuario = db.Usuario

var indexRouter = require('./routes/index');
var productRouter = require('./routes/products');
var usersRouter = require('./routes/users');
const { Session } = require('inspector')

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
  secret: 'keyboardsecret',
  resave: false,
  saveUninitialized: true
}));

app.use(function(req,res,next){
  res.locals.user = undefined;

  if (req.cookies.user !== undefined && req.session.user === undefined) {
    Usuario.findByPK(parseInt(req.cookies.user))
      .then(function(response){
        let objUsuario = {
          id: response.id,
          email: response.email,
          Usuario: response.Usuario,
          fecha: response.fecha,
          dni: response.dni,
          fotoPerfil: response.fotoPerfil,
          createdAt: response.createdAt,
          updatedAt: response.updatedAt,
          deletedAt: response.deletedAt,
        };
        req.session.user = objUsuario;
        res.locals.user = req.session.user;
        next();
      })
      .catch(function(error){
        return res.send(error);
      })
  } else if (req.session.user !== undefined) {
    res.locals.user = req.session.user;
    next();
  } else {
    next()
  }
})

app.use('/', indexRouter);
app.use('/', productRouter);
app.use('/', usersRouter);


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
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

// app.listen(3000, () => {
//     console.log("Servidor corriendo en el puerto 3000");
// });