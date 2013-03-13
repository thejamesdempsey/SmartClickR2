/*
* SmartClickR Email-Dispatcher Module
* Used sending emails for account confirmation
* Version: 0.8.1
*/


var ES = require('./email-settings');

var ED = {};

module.exports = ED;

ED.server = require("emailjs/email").server.connect({
	host		: ES.host,
	user		: ES.sender,
	password	: ES.password,
	ssl			: true
	
});

ED.resetPasswordLink = function(user, callback) {	
	var link = 'localhost:8000/reset-password?e=' + user.Email + '&p=' + user.Password;
	
	var message = {
		text: 	"You forgot your password, but have no fear. We are brewing a new one for you. \r\n \r\n Click the link below to reset your password for your SmartClickr account: \r\n " + link + "\r\n \r\n Toodles, \r\n \r\n Your Friends at SmartClickr",	
		from		: "SmartClickr Support <" + ES.sender + ">",
		to			: "<"+user.Email+">",
		subject		: 'SmartClickR Reset Password',
		//attachment	: ED.resetPasswordEmail(user)
	};
	
	ED.server.send(message, function(err, message) {console.log(err || message); });
}

ED.confirmEmailLink = function(user, callback) {
	
	ED.server.send({
		from		: ES.sender,
		to			: user.email,
		subject		: 'Confirm your SmartClickR Account',
		attachment	: EM.confirmAccountEmail(account)
	}, callback );
}

ED.resetPasswordEmail = function(user) {
	var link = 'http://smartclickr.com/reset-password?e=' + user.Email + '&p=' + user.Password;
	var html = "<html><body>";
		html += "Hi, " + user.FirstName + ", <br><br>";
		html += "<a href='" + link + "'>Please click here to reset your password</a>";
		html += "</body></html>";

	
	return [{data:html, alternative: true}];
}

ED.confirmAccountEmail = function(o) {
	var link = 'http://smartclickr.com/confirm-email?e=' + o.email;
	var html = "";
	
	return [{data:html, alternative: true}];
}