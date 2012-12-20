var PM = require('./modules/poll-manager');

// Get /user/:User_ID/poll/create //
exports.createPoll = function(request, response) {
	var user = request.session.user;
	response.render('create-poll.jade', { title: 'SmartClickR | Create New Poll', locals: { udata: user }});
}