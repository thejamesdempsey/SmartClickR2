var AM = require('./modules/account-manager');

// GET /index //
exports.index = function(request, response) {
	console.log('User cookie', request.cookies.email);
	console.log('Pass cookie', request.cookies.pass);
	if (request.cookies.email == undefined || request.cookies.pass == undefined) {
		response.render('index.jade', { title: 'SmartClickr | Welcome' });
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
	response.render('features.jade', { title: 'SmartClickr | Polling and Presentation Features', layout: 'features_layout' });
}

// GET /help-center //
exports.help = function(request, response) {
	if(request.session.user != null && request.session.user != undefined)
		response.render('help.jade', { title: 'SmartClickr | Help Center', layout: 'help-center_layout' });
	else
		response.redirect('/');
}

// GET /samples //
exports.samples = function(request, response) {
	response.render('samples.jade', { title: 'SmartClickr | Sample Questions', layout: 'samples_layout' });
}

// GET /about-us //
exports.about = function(request, response) {
	response.render('about.jade', { title: 'SmartClickr | About', layout: 'about_layout' });
}


// GET /about-us //
exports.blog = function(request, response) {
	response.render('blog.jade', { title: 'SmartClickr | Blog', layout: 'blog_layout' });
}


// GET /data-center //
exports.contact = function(request, response) {
	response.render('contact.jade', { title: 'SmartClickr | Contact Us', layout: 'contact_layout' });
}

// GET /contact //
exports.data = function(request, response) {
	response.render('data.jade', { title: 'SmartClickr | Data Center', layout: 'data_layout' });
}

// GET /privacy //
exports.privacy = function(request, response) {
	response.render('privacy.jade', { title: 'SmartClickr | Privacy', layout: 'privacy_layout' });
}

// GET /terms //
exports.terms = function(request, response) {
	response.render('terms.jade', { title: 'SmartClickr | Terms of Service', layout: 'terms_layout' });
}

exports.lostPassword = function(request, response) {
	response.render('pass_lost.jade', { title: 'SmartClickr | Forgot your Password?', layout: 'layout_reset'});
}

exports.email = function(request, response) {
	response.render('email.jade', { title: 'SmartClickr | Emails', layout: 'email_layout' });
}


exports.problemo = function(request, response) { 
 	response.render('404.jade', {title: 'SmartClickr | This page got lost', layout:'404_layout'}); 
}









