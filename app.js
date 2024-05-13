var createError = require('http-errors');
var express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dbConn = require('./config/db.config').testDBConn;
const dotenv = require("dotenv");

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var app = express();

dotenv.config();

/*
var corsOption = {
  origin: 'http://localhost:3000'
};
*/

app.use(cors());
app.use(bodyParser.json());


//Import Routes to listen for
require('./routes/users.routes')(app);
require('./routes/reviews.routes')(app);
require('./routes/TMDB.routes')(app);
require('./routes/likes.routes')(app);
require('./routes/auth.routes')(app);



dbConn();

//Port the Express APP is running on
const port = process.env.EXPORT;
//app.listen(port, ()=> {console.log('App running on port ' + port);});

//Test GET status display
app.get("/status", (request, response) => {
  const status = {
    "Status": "Running"
  };
  response.status(200).send(status);
});


//SOMETHING IN HERE MAKE THE EXPRESS APP NOT WORK WITH REACT APP
/*
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
*/

//app.use(express.json());
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
  console.log("Generic 404")
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log("Generic 500 Error");
  res.json({error:err});
});


module.exports = app;
