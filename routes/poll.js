var PM = require('./modules/poll-manager');
var QM = require('./modules/question-manager');
var CM = require('./modules/choice-manager');
var FM = require('./modules/format-manager');

// GET /user/:User_ID/poll/create //
exports.getCreatePoll = function(request, response) {
	if(request.session.user != null && request.session.user != undefined) {
		var user = request.session.user[0];
		console.log(user);
		response.render('create-poll.jade', { title: 'SmartClickR | Create New Poll', locals: { udata: user }});
	} else {
		response.redirect('/');
	}
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
	
	if(request.session.user != null && request.session.user != undefined) {
		var user = request.session.user[0];
		FM.getQuestions(request.param('Poll_ID'), function(results) {
			var questions = results;

			PM.getPollFromID(request.param('Poll_ID'), function(result) {
				console.log(result);
				console.log(JSON.stringify(questions));
				var poll = result[0];
				response.render('edit-poll.jade', { title: 'SmartClickR | Edit your Poll', locals: { udata: user, pdata: poll,  qdata: questions }});
			});
		});
	} else {
		response.redirect('/');
	}
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

// GET /poll/:SessionCode //
// takes you to the poll landing page and returns question IDs and Poll Description //
exports.getPollQuestions = function(request, response) {

	var sessionCode = request.param('SessionCode');
	
	PM.getPoll(sessionCode, function(result) {
		if(result != 'poll-not-found') {
			QM.getPollQuestions(sessionCode, function(qids) {
				FM.arrayQID(qids, function(questionIDs) {
					//should determine if i should use cookie
					request.session.questionIDs = questionIDs;
					PM.pollLanding(sessionCode, function(pollData) {
						console.log(pollData);
						response.render('landing.jade', { title: 'SmartClickR | Starting Poll', locals: { QuestionIDs : questionIDs, pdata : pollData , session : sessionCode }});
					});
				});
			});
		} else {
				response.render('poll-not-found.jade', {title:'SmartClickR | Poll Not Found'});
		}
	});
}


exports.presentLandingPage = function(request, response) {
	
	if(request.session.user != null && request.session.user != undefined) {
		var pollID = request.param('Poll_ID');
		var user = request.session.user;

		PM.getPollFromID(pollID, function(result) {
			if(result != 'poll-not-found') {
				QM.getPollQuestionsPID(pollID, function(qids) {
					FM.arrayQID(qids, function(questionIDs) {
						//should determine if i should use cookie
						request.session.questionIDs = questionIDs;
						response.render('present-landing.jade', {title: 'SmartClickR | Lets Present', locals: { QuestionIDs : questionIDs, pdata : result, udata : user }});
					});
				});
			} 
		});
		
	} else {
		response.redirect('/');
	}
}


// GET /user/:User_ID/poll/:Poll_ID/present/final //
exports.presentFinal = function(request, response) {
	pollID = request.param('Poll_ID');
	request.session.questionIDs = '';

	console.log(pollID);
	PM.getPollFromID(pollID, function(poll) {
		console.log(poll);
		response.render('final.jade', { title: 'SmartClickR | Poll Completed', locals: { pdata : poll }});
	});
}
