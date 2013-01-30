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
		});
	}
};

// GET /features //
exports.features = function(request, response) {
	response.render('features.jade', { title: 'SmartClickR | Polling and Presentation Features', layout: 'features_layout' });
}

// GET /help-center //
exports.help = function(request, response) {
	response.render('help.jade', { title: 'SmartClickR | Help Center', layout: 'help-center_layout' });
}

// GET /samples //
exports.samples = function(request, response) {
	response.render('samples.jade', { title: 'SmartClickR | Sample Questions', layout: 'samples_layout' });
}

// GET /about-us //
exports.about = function(request, response) {
	response.render('about.jade', { title: 'SmartClickR | About', layout: 'about_layout' });
}


// GET /about-us //
exports.blog = function(request, response) {
	response.render('blog.jade', { title: 'SmartClickR | Blog', layout: 'blog_layout' });
}


// GET /data-center //
exports.contact = function(request, response) {
	response.render('contact.jade', { title: 'SmartClickR | Contact Us', layout: 'contact_layout' });
}

// GET /contact //
exports.data = function(request, response) {
	response.render('data.jade', { title: 'SmartClickR | Data Center', layout: 'data_layout' });
}

// GET /privacy //
exports.privacy = function(request, response) {
	response.render('privacy.jade', { title: 'SmartClickR | Privacy', layout: 'privacy_layout' });
}

// GET /terms //
exports.terms = function(request, response) {
	response.render('terms.jade', { title: 'SmartClickR | Terms of Service', layout: 'terms_layout' });
}


exports.problemo = function(request, response) { 
 	response.send('404'); 
}







