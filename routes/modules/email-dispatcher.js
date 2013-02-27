var ES = require('./email-settings');
var ED = {};

module.exports = ED;

ED.server = require("emailjs/email").server.connect({
	host		: ES.host,
	user		: ES.user,
	password	: ES.password,
	ssl			: true
	
});

ED.resetPasswordLink = function(account, callback) {
	ED.server.send({
		from		: ES.sender,
		to			: account.email,
		subject		: 'Reset your SmartClickR Password',
		attachment	: EM.resetPasswordEmail(account)
	}, callback );
}

ED.confirmEmailLink = function(account, callback) {
	ED.server.send({
		from		: ES.sender,
		to			: account.email,
		subject		: 'Confirm your SmartClickR Account',
		attachment	: EM.confirmAccountEmail(account)
	}, callback );
}

ED.resetPasswordEmail = function(o) {
	var link = 'http://smartclickr.com/reset-password?e=' + o.email + '&p=' + o.pass;
	var html = "";
	
	return [{data:html, alternative: true}];
}

ED.confirmAccountEmail = function(o) {
	var link = 'http://smartclickr.com/confirm-email?e=' + o.email;
	var html = "";
	
	return [{data:html, alternative: true}];
}