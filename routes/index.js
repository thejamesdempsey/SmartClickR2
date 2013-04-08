var AM = require('./modules/account-manager');
var ED = require('./modules/email-dispatcher');

// GET /index //
exports.index = function(request, response) {
	console.log('User cookie', request.cookies.email);
	console.log('Pass cookie', request.cookies.pass);
	if (request.cookies.email == undefined || request.cookies.pass == undefined) {
		response.render('index.jade', { title: 'Better Audience Interaction - SmartClickr' });
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
	response.render('features.jade', { title: 'Polling and Presentation Features - SmartClickr', layout: 'features_layout' });
}

// GET /help-center //
exports.help = function(request, response) {
	response.render('help.jade', { title: 'Help Center - SmartClickr', layout: 'help-center_layout' });

}

// GET /samples //
exports.samples = function(request, response) {
	response.render('samples.jade', { title: 'Sample Questions - SmartClickr', layout: 'samples_layout' });
}

// GET /about-us //
exports.about = function(request, response) {
	response.render('about.jade', { title: 'About - SmartClickr', layout: 'about_layout' });
}


// GET /about-us //
exports.blog = function(request, response) {
	response.render('blog.jade', { title: 'Blog - SmartClickr', layout: 'blog_layout' });
}


// GET /data-center //
exports.contact = function(request, response) {
	response.render('contact.jade', { title: 'Contact Us - SmartClickr', layout: 'contact_layout' });
}


exports.postContact =  function(request, response) {
	console.log(request.param('name'));
	console.log(request.param('email'));
	console.log(request.param('subject'));
	ED.contactEmail({
		name		: request.param('name'),
		email		: request.param('email'),
		subject		: request.param('subject'),
		message		: request.param('message')		
		}, function(err, o) {
			if(err) {
				console.log(err);
				response.send('email-server-error', 400);				
			} else {				
				response.send('okay', 200);
			}
		});
}

// GET /contact //
exports.data = function(request, response) {
	response.render('data.jade', { title: 'Data Center - SmartClickr', layout: 'data_layout' });
}

// GET /privacy //
exports.privacy = function(request, response) {
	response.render('privacy.jade', { title: 'Privacy - SmartClickr', layout: 'privacy_layout' });
}

// GET /terms //
exports.terms = function(request, response) {
	response.render('terms.jade', { title: 'Terms of Service - SmartClickr', layout: 'terms_layout' });
}

exports.lostPassword = function(request, response) {
	response.render('pass_lost.jade', { title: 'Forgot your Password? - SmartClickr', layout: 'layout_reset'});
}

exports.resetPassword = function(request, response) {
	response.render('pass_reset.jade', {title: 'Reset your Password - SmartClickr', layout: 'layout_reset'});
}

exports.gettingStarted = function(request, response) {
	response.render('guide.jade', {title: 'Getting Started with SmartClickr', layout: 'layout_guide'});
}

exports.email = function(request, response) {
	response.render('email.jade', { title: 'SmartClickr | Emails', layout: 'email_layout' });
}


exports.playground = function(request, response) {
	response.render('playground.jade', {title: 'Playground - Smartclickr'});
}

exports.playground_hometest1 = function(request, response) {
	response.render('playground-hometest1.jade', {title: 'Playground - SmartClickr'});
}

exports.playground_hometest2 = function(request, response) {
	response.render('playground-hometest2.jade', {title: 'Playground - SmartClickr'});
}

exports.google_verify = function(request, response){
	response.render('google40e4f1647f3d7fab.html');
}

exports.problemo = function(request, response) { 
 	response.render('404.jade', {title: 'This page got lost - SmartClickr', layout:'404_layout'}); 
}









