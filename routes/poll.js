var PM = require('./modules/poll-manager');
var QM = require('./modules/question-manager');
var CM = require('./modules/choice-manager');

// GET /user/:User_ID/poll/create //
exports.getCreatePoll = function(request, response) {
	var user = request.session.user[0];
	console.log(user);
	response.render('create-poll.jade', { title: 'SmartClickR | Create New Poll', locals: { udata: user }});
}

// POST /user/:User_ID/poll/create //
exports.postCreatePoll = function(request, response) {
	console.log("client sent.... " + request.param('User_ID'));
	PM.createNewPoll({ User_ID :request.param('User_ID'),
					   PollName: request.param('pollName') }, function(code) {
		PM.updatePollDescription(code, request.param('pollDescription'), function(o) {
			PM.getPollId(code, function(pollId) {
				response.send({sessionCode: code, pollID : pollId});
			});
		});
	});
}



// GET /user/:User_ID/poll/edit/:Poll_ID //
exports.getEditPoll = function(request, response) {
	var user = request.session.user[0];
	var choices = [];
	//console.log(request.param('Poll_ID'));

	QM.getQuestions(request.param('Poll_ID'), function(questions) {

		console.log(questions);

	});
	//response.render('edit-poll.jade', { title: 'SmartClickR | Edit your Poll', locals: { udata: user }});t
}

// POST /user/:User_ID/poll/update/:Poll_ID //
exports.updatePollDescription = function(request, response) {

}

// POST /user/:User_ID/poll/delete/:Poll_ID
exports.deletePoll = function(request, response) {

	console.log('Poll ID', request.params.Poll_ID);
	console.log('User ID', request.params.User_ID);
	PM.delete(request.params.Poll_ID, function(results) {

		//must also delete all the corresponding questions and choices!!!
		response.redirect('/user/' + request.params.User_ID);
	});
}