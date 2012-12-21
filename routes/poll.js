var PM = require('./modules/poll-manager');

// GET /user/:User_ID/poll/create //
exports.getCreatePoll = function(request, response) {
	var user = request.session.user;
	response.render('create-poll.jade', { title: 'SmartClickR | Create New Poll', locals: { udata: user }});
}

// POST /user/:User_ID/poll/create //
exports.postCreatePoll = function(request, response) {
	console.log("client sent.... " + request.param('id'));
	PM.createNewPoll({ User_ID :request.param('id'),
					   PollName: request.param('pollName') }, function(results) {
		PM.updatePollDescription(results, request.param('pollDescription'), function(o) {
			response.send(results, 200);
		});
	});
}

// POST /user/:User_ID/poll/update/:Poll_ID //
exports.updatePollDescription = function(request, response) {

}

// POST /user/:User_ID/poll/delete/:Poll_ID
exports.deletePoll = function(request, response) {

	console.log(request.params.Poll_ID);
	PM.delete(request.params.Poll_ID, function(results) {
		response.redirect('/user/' + request.param.User_ID);
	});
}