var AM = require('./modules/account-manager');
/*
 * GET users listing.
 */

exports.list = function(req, res) {
	res.send("respond with a resource");
};

exports.signup = function(request, response) {
	response.render('signup.jade', { title: 'SmartClickR | Join Now' });
	console.log(request.protocol);
};

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

exports.getLogin = function(request, response) {
	response.render('login.jade', { title: 'SmartClickR | Login'});
	console.log(request.protocol);
}

exports.postLogin = function(request, response) {
	AM.manualLogin(request.param('email'), request.param('password'), function(err, o) {
		if(err) {
			response.send(err, 400);
		} else {
			// the user information/session is stored in this variable 
			// and passed to the userhome.jade page
			//request.session.user = o;
			if(request.param('remember-me') == 'true'){
				response.cookie('email', o.email, { maxAge: 900000 });
				response.cookie('pass', o.password, { maxAge: 900000 });
			}
			
			console.log(o);
			response.redirect('/home/' + o[0].User_ID);
		}
	});
}

exports.getHome = function(request, response) {
	response.render('userhome.jade', { title: 'SmartClickR | Home'});
}

