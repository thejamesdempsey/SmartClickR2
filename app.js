/***********
*  SmartClickR
*  Version 0.4.7
*  Authors: Daniel To, Jimmy Dempsey, Brad Fischer, Billy Godfrey
**/

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , poll = require('./routes/poll')
  , question = require('./routes/question')
  , http = require('http')
  , path = require('path')
  , lessMiddleware = require('less-middleware')
  , less = require('less');

var app = express();


app.configure(function(){
  app.set('port', process.env.PORT || 8000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.cookieParser('the-secret-is-at-klines'));
  app.use(express.session());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'vendor')));
  app.use(lessMiddleware({
	 src			: __dirname + "public",
	 compress	: true
	}));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
  app.use(function(request, response, next) {
	  response.render('404.jade', {title: 'SmartClickR | This page got lost', layout:'404_layout'});	
  });
});

// main pages //
app.get('/', routes.index);
app.get('/features', routes.features);
app.get('/help', routes.help);
app.get('/samples', routes.samples);
app.get('/about', routes.about);
app.get('/blog', routes.blog);
app.get('/contact', routes.contact);
app.get('/data', routes.data);
app.get('/privacy', routes.privacy);
app.get('/terms', routes.terms);

// user pages //
app.get('/user/create', user.signup);
app.post('/user/create', user.createUser);
app.get('/login', user.getLogin);
app.post('/login', user.postLogin);
app.get('/user/:User_ID', user.getHome);
app.get('/user/edit/:User_ID', user.getAccount);
app.post('/user/edit/:User_ID', user.updatePassword);
app.get('/logout', user.logout);

// poll pages //
app.get('/user/:User_ID/poll/create', poll.getCreatePoll);
app.post('/user/:User_ID/poll/create', poll.postCreatePoll);
app.get('/user/:User_ID/poll/edit/:Poll_ID', poll.getEditPoll);
app.post('/user/:User_ID/poll/delete/:Poll_ID', poll.deletePoll);

// question pages //
app.post('/user/:User_ID/poll/:Poll_ID/question/create', question.postNewQuestion);

// responding pages //
app.get('/poll/:SessionCode', poll.getPollQuestions);
app.get('/poll/:SessionCode/question/:Question_ID', question.pollQuestion);
app.post('/poll/:SessionCode/question/:Question_ID', question.postResponse);

// poll present pages //
app.get('/user/:User_ID/poll/:Poll_ID?', poll.presentLandingPage);
app.get('/user/:User_ID/poll/:Poll_ID/present/final', poll.presentFinal);
app.get('/user/:User_ID/poll/:Poll_ID/question/:Question_ID.json', question.responseData);
app.get('/user/:User_ID/poll/:Poll_ID/question/present/:Question_ID', question.presentPollQuestion);


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

