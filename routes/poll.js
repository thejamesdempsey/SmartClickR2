var PM = require('./modules/poll-manager');

// GET /user/:User_ID/poll/create //
exports.getCreatePoll = function(request, response) {
	var user = request.session.user[0];
	console.log(user);
	response.render('create-poll.jade', { title: 'SmartClickR | Create New Poll', locals: { udata: user }});
}

// POST /user/:User_ID/poll/create //
exports.postCreatePoll = function(request, response) {
	console.log("client sent.... " + request.param('id'));
	PM.createNewPoll({ User_ID :request.param('id'),
					   PollName: request.param('pollName') }, function(code) {
		PM.updatePollDescription(code, request.param('pollDescription'), function(o) {
			PM.getPollId(code, function(pollId) {
				response.send(200, {sessionCode: code, pollID : pollId});
			});
		});
	});
}

// POST /user/:User_ID/poll/update/:Poll_ID //
exports.updatePollDescription = function(request, response) {

}

// POST /user/:User_ID/poll/delete/:Poll_ID
exports.deletePoll = function(request, response) {

	console.log('Poll ID', request.params.Poll_ID);
	console.log('User ID', request.params.User_ID);
	PM.delete(request.params.Poll_ID, function(results) {
		response.redirect('/user/' + request.params.User_ID);
	});
}