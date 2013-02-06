var AM = require('./modules/account-manager');
var PM = require('./modules/poll-manager');
var bcrypt = require('bcrypt');
/*
 * GET users listing.
 */

// GET /user/create //
exports.signup = function(request, response) {
	response.render('signup.jade', { title: 'SmartClickR | Join Now' });
	console.log(request.protocol);
};

// POST /user/create //
exports.createUser = function(request, response) {
	AM.signup({
		FirstName	: request.param('firstName'),
		LastName	: request.param('lastName'),
		Email		: request.param('email'),
		Password	: request.param('password')
	}, function(err, o) {
		if(err) {
			console.log(err);
			response.send(err, 400);
		} else {
			// need to send out user confirmaiton email at this point
			//response.send('okay', 200);
			response.redirect('/login');
		}
	});
}

// GET /login //
exports.getLogin = function(request, response) {
	response.render('login.jade', { title: 'SmartClickR | Login', layout:'layout_login.jade'});
	console.log(request.protocol);
}

// POST /login //
exports.postLogin = function(request, response) {
	AM.manualLogin(request.param('email'), request.param('password'), function(err, o) {
		if(!o) {
			response.set('Content-Type', 'text/plain');
			response.send(err, 400);
		} else {
			// the user information/session is stored in this variable 
			// and passed to the userhome.jade page
			request.session.user = o;
			if(request.param('remember-me') == 'on') {
				response.cookie('email', o[0].Email, { maxAge: 900000 });
				response.cookie('pass', o[0].Password, { maxAge: 900000});
			}

			response.redirect('/user/' + o[0].User_ID);
		}
	});
}

// GET /user/:User_ID //
exports.getHome = function(request, response) {

	if(request.session.user != null && request.session.user != undefined) {
		var user = request.session.user[0];

		PM.getUsersPolls(user.User_ID, function(results) {
			var polls = results;
			
			//format the date of each poll to display on the User's page
			for(var i = 0; i < results.length; i++) {
				var date = polls[i].CreateDate.toDateString().split(" ");
				var formatDate = date[1] + " " + date[2] + ", " + date[3];
				polls[i].CreateDate = formatDate;
			}
			response.render('userhome.jade', { title: 'SmartClickR | Home', locals: {udata: user, pdata: polls}, layout: 'layout_userhome.jade' });
		});
	} else {
		response.redirect('/');
	}
}


// GET /user/edit/:User_ID //
exports.getAccount = function(request, response) {
	var user = request.session.user[0];
	console.log(user);
	response.render('account.jade', { title: 'SmartClick | Account', locals: { udata : user }});
}

// POST /user/:User_ID/account //
exports.updateAccount = function(request, response) {
	//update user's account: change password, etc...

}

exports.updatePassword = function(request, response) {
	var user = request.session.user[0];

	bcrypt.compare(request.param('currentPassword')[0], user.Password, function(err, match) {
		if(match) {
			if(request.param('NewPassword')[0] == request.param('reNewPassword')[0]) {
				AM.setpasword(user.Email, request.param('reNewPassword')[0], function(o) {
					response.cookie('pass', o, { maxAge: 900000});
					response.send({res	: 'success'});
					console.log('password changed');
				});
			} else {
				response.send({res : 'no match'});
				console.log('passwords do not match');
			}
		} else {
			response.send({res : 'wrong'});
			console.log('current password wrong');
		}
	});
}

// GET /logout //
exports.logout = function(request, response) {
	if(request.session.user) {
		request.session.destroy();
		response.clearCookie('email');
		response.clearCookie('pass');
		console.log(request.cookies.email, request.cookies.pass);
	}
	response.redirect('/');
}

// POST /user/delete/:User_ID //
exports.delete = function(request, response) {

}