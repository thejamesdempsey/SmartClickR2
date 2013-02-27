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
	user		: ES.user,
	password	: ES.password,
	ssl			: true
	
});

ED.resetPasswordLink = function(user, callback) {
	ED.server.send({
		from		: ES.sender,
		to			: user.Email,
		subject		: 'Reset your SmartClickR Password',
		attachment	: EM.resetPasswordEmail(user)
	}, callback );
}

ED.confirmEmailLink = function(user, callback) {
	ED.server.send({
		from		: ES.sender,
		to			: account.email,
		subject		: 'Confirm your SmartClickR Account',
		attachment	: EM.confirmAccountEmail(account)
	}, callback );
}

ED.resetPasswordEmail = function(user) {
	var link = 'http://smartclickr.com/reset-password?e=' + user.Email + '&p=' + user.Password;
	var html = "";
	
	return [{data:html, alternative: true}];
}

ED.confirmAccountEmail = function(o) {
	var link = 'http://smartclickr.com/confirm-email?e=' + o.email;
	var html = "";
	
	return [{data:html, alternative: true}];
}