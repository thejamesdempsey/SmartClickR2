
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , poll = require('./routes/poll')
  , question = require('./routes/question')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.cookieParser('the-secret-is-at-klines'));
  app.use(express.session());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.static(path.join(__dirname, 'vendor')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

// main pages //
app.get('/', routes.index);
app.get('/features', routes.features);

// user pages //
app.get('/user/create', user.signup);
app.post('/user/create', user.createUser);
app.get('/login', user.getLogin);
app.post('/login', user.postLogin);
app.get('/user/:User_ID', user.getHome);
app.get('/user/edit/:User_ID', user.getAccount);
app.get('/logout', user.logout);

// poll pages //
app.get('/user/:User_ID/poll/create', poll.getCreatePoll);
app.post('/user/:User_ID/poll/create', poll.postCreatePoll);
app.post('/user/:User_ID/poll/delete/:Poll_ID', poll.deletePoll);

// question pages //
app.post('/user/:User_ID/poll/:Poll_ID/question/create', question.postNewQuestion);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
