var AM = require('./modules/account-manager');
var PM = require('./modules/poll-manager');
/*
 * GET users listing.
 */

// GET /user //
exports.signup = function(request, response) {
	response.render('signup.jade', { title: 'SmartClickR | Join Now' });
	console.log(request.protocol);
};

// POST /user //
exports.createUser = function(request, response) {
	AM.signup({
		FirstName	: request.param('firstName'),
		LastName	: request.param('lastName'),
		Email		: request.param('email'),
		Password	: request.param('password')
	}, function(err, o) {
		if(err) {
			response.send(err, 400);
		} else {
			// need to send out user confirmaiton email at this point
			//response.send('okay', 200);
			response.redirect('/');
		}
	});
}

// GET /login //
exports.getLogin = function(request, response) {
	response.render('login.jade', { title: 'SmartClickR | Login'});
	console.log(request.protocol);
}

// POST /login //
exports.postLogin = function(request, response) {
	AM.manualLogin(request.param('email'), request.param('password'), function(err, o) {
		if(err) {
			response.send(err, 400);
		} else {
			// the user information/session is stored in this variable 
			// and passed to the userhome.jade page
			request.session.user = o[0];
			if(request.param('remember-me') == 'true'){
				response.cookie('email', o.email, { maxAge: 900000 });
				response.cookie('pass', o.password, { maxAge: 900000 });
			}
			
			//console.log(o);
			response.redirect('/user/' + o[0].User_ID);
		}
	});
}

// GET /user/:User_ID //
exports.getHome = function(request, response) {
	var user = request.session.user;
	//request.param('User_ID') == user.User_ID
	if(request.session.user != null) {
		PM.getUsersPolls(user.User_ID, function(results) {
			var polls = results;
			//console.log(polls);
			for(var i = 0; i < results.length; i++) {
				var date = polls[i].CreateDate.toDateString().split(" ");
				var formatDate = date[1] + " " + date[2] + ", " + date[3];
				polls[i].CreateDate = formatDate;
			}
			response.render('userhome.jade', { title: 'SmartClickR | Home', locals: {udata: user, pdata: polls} });
		});
	} else {
		response.redirect('/');
	}
}


// GET /user/edit/:User_ID //
exports.getAccount = function(request, response) {
	var user = request.session.user;
	response.render('account.jade', { title: 'SmartClick | Account', locals: user });
}

// POST /user/:User_ID/account //
exports.updateAccount = function(request, response) {
	//update user's account: change password, etc...
}

// GET /logout //
exports.logout = function(request, response) {
	if(request.session.user) {
		request.session.destroy();
	}
	response.redirect('/');
}