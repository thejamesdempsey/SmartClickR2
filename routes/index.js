var AM = require('./modules/account-manager');

// GET /index //
exports.index = function(request, response) {
	console.log('User cookie', request.cookies.email);
	console.log('Pass cookie', request.cookies.pass);
	if (request.cookies.email == undefined || request.cookies.pass == undefined) {
		response.render('index.jade', { title: 'SmartClickR | Welcome' });
	} else {
		AM.autoLogin(request.cookies.email, request.cookies.pass, function(err, results) {
			if (results != null) {
				request.session.user = results;
				response.redirect('/user/' + results[0].User_ID);
			} else {
				response.redirect('/login');
			}
		})
	}
	
};


// GET /features //
exports.features = function(request, response) {
	response.render('features.jade', { title: 'SmartClickR | Polling and Presentation Features', layout: 'features_layout' });
}


