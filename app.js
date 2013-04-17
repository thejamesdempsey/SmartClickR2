/***********
*  SmartClickR
*  Version 0.4.7
*  Authors: Daniel To, Jimmy Dempsey, Brad Fischer, Billy Godfrey
**/

var express = require('express-alias')
  , app = require('express')()
  , routes = require('./routes')
  , user = require('./routes/user')
  , poll = require('./routes/poll')
  , question = require('./routes/question')
  , http = require('http')
  , path = require('path')
  , lessMiddleware = require('less-middleware')
  , less = require('less')
  , server = require('http').createServer(app)
 // , var alias = require('express-alias')
  , io = require('socket.io').listen(server);

//require('express-alias')

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

question.createSocket(io);

// main pages //
app.get('/', routes.index);
app.get('/features', routes.features);
app.get('/help', routes.help);
app.get('/samples', routes.samples);
app.get('/about', routes.about);
app.get('/blog', routes.blog);
app.get('/contact', routes.contact);
app.post('/contact', routes.postContact);
app.get('/data', routes.data);
app.get('/privacy', routes.privacy);
app.get('/terms', routes.terms);
app.get('/resources', routes.resources);
app.get('/resources/getting-started-with-smartclickr', routes.gettingStarted);

// USER PAGES //

	// Signup //
	app.alias('/user/create', '/signup', 301);
	app.get('/signup', user.signup);
	app.post('/user/create', user.createUser);

	// Login //
	app.get('/login', user.getLogin);
	app.post('/login', user.postLogin);

	// Lost Password //
	app.get('/lostpassword', routes.lostPassword);
	app.post('/lostpassword', user.postLostPassword);

	// Reset Password //
	app.get('/reset-password', routes.resetPassword);
	app.post('/reset-password', user.postResetPassword);

	// User Home //
	app.alias('/user/:User_ID', '/command-center', 301);
	app.get('/command-center', user.getHome);

	// User Settings //
	app.alias('/user/edit/:User_ID', '/settings', 301);
	app.get('/settings', user.getAccount);
	app.post('/user/edit/:User_ID', user.updatePassword);
	
	// Delete User Account //
	app.post('/user/delete/:User_ID', user.delete);
	
	// Account Deleted Feedback Form //
	app.get('/good-bye', user.getFeedback);
	
	// Logout // 
	app.get('/logout', user.logout);

// POLL PAGES //

	// Create a new poll //
	app.alias('/user/:User_ID/poll/create', '/create', 301);
	app.get('/create', poll.getCreatePoll);
	app.post('/user/:User_ID/poll/create', poll.postCreatePoll);
	
	// Edit a poll //
	app.get('/user/:User_ID/poll/edit/:Poll_ID', poll.getEditPoll);
	
	//app.get('/user/:User_ID/poll/edit/:Poll_ID', poll.getEditPoll);
	app.post('/user/:User_ID/poll/edit/:Poll_ID', question.postEditPoll);
	//app.get('/user/:User_ID/poll/edit/:Poll_ID', poll.getEditPoll);
	
	// Delete a poll //
	app.post('/user/:User_ID/poll/delete/:Poll_ID', poll.deletePoll);

// QUESTION PAGES //

	// Create a new question //
	app.post('/user/:User_ID/poll/:Poll_ID/question/create', question.postNewQuestion);
	// app.post('/user/:User_ID/poll/edit/:Poll_ID', question.postEditPoll);
	
	// Delete a question //
	app.post('/user/:User_ID/poll/:Poll_ID/question/delete/:Question_ID', question.deleteQuestion);

// RESPONDING PAGES //

	// Get the main response page //
	app.get('/poll/:SessionCode', poll.getPollQuestions);
	
	// Get questions //
	app.get('/poll/:SessionCode/question/:Question_ID', question.pollQuestion);
	
	// Submit the questions //
	app.post('/poll/:SessionCode/question/:Question_ID', question.postResponse);

// POLL PRESENT PAGES //

	app.get('/user/:User_ID/poll/:Poll_ID?', poll.presentLandingPage);
	app.get('/user/:User_ID/poll/:Poll_ID/present/final', poll.presentFinal);
	// app.get('/user/:User_ID/poll/:Poll_ID/present/final', poll.presentFinal);
	
	
	app.get('/user/:User_ID/poll/:Poll_ID/question/:Question_ID.json', question.responseData);
	app.get('/user/:User_ID/poll/:Poll_ID/question/present/:Question_ID', question.presentPollQuestion);


// THE PLAYGROUND //

app.get('/playground', routes.playground);
app.get('/playground/email', routes.email);
app.get('/playground/test1', routes.playground_hometest1);
app.get('/playground/test2', routes.playground_hometest2);

server.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

