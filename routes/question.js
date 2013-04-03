var QM = require('./modules/question-manager');
var CM = require('./modules/choice-manager');
var PM = require('./modules/poll-manager');
var FM = require('./modules/format-manager');
var RM = require('./modules/response-manager');
var io, socket;	
// POST /user/:User_ID/poll/:Poll_ID/question/create //
// Create poll //
exports.postNewQuestion = function(request, response) {

	var questions = request.param('questions');
	var types = request.param('questionType');
	var count = [];

	if(types != undefined && types.length > 0) {
		for(var i = 0; i < types.length; i++) {
			count.push(i + 1);

			//types, questions, pollID, numb, count
			newQuestionHelper(types, questions, request.param('Poll_ID'), i, count);
		}
	}
	response.send(200);
}

// POST /user/:User_ID/poll/edit/:Poll_ID //
exports.postEditPoll = function(request, response) {
	var types = request.param('questionType');
	var questions = request.param('questions');
	var pollData = request.param('pollData');
	var questionIDs = request.param('questionIDs');
	var count = [];

	PM.updatePollData({pollName: pollData[1], pollDescription: pollData[2], pollID : pollData[0]}, function(nothing) {
		if(types != undefined && types.length > 0) {
			for(var i = 0; i < types.length; i++) {		
				count.push(i + 1);
	
				if(questionIDs != undefined && i < questionIDs.length) {
					//update question helper
					updateQuestionHelper(questionIDs[i], types, questions[i], i, count);

				} else {
					//types, question, pollID, numb, currentCount
					newQuestionHelper(types, questions, request.param('Poll_ID'), i, count);
				}
			}
		}
		response.send(200);
	});

}

// POST /user/:User_ID/poll/:Poll_ID/question/delete/:Question_ID //
exports.deleteQuestion = function(request, response) {
	var questionID = request.param('Question_ID');
	QM.delete(questionID, function(o) {
		response.send(200);
	});
}

// GET /poll/:SessionCode/question/:Question_ID //
exports.pollQuestion = function(request, response) {
	questionIDs = request.session.questionIDs;
	currentQID = request.param('Question_ID');
	sessionCode = request.param('SessionCode');

	FM.getQuestionSC(currentQID, sessionCode, function(questionData) {
		
		if(questionData == 'question-doesnt-exist') {
			response.redirect('/');
		} else {
			response.render('response.jade', { title: 'SmartClickR | Poll Response', locals: { QuestionIDs : questionIDs, qdata : questionData , session : sessionCode }});
		}
	});
}

// POST /poll/:SessionCode/question/:Question_ID //
exports.postResponse = function(request, response) {

	// must figure out a way so that users can't double post
	// redirect if the post has already been made....
	var respondIDs = request.session.respondIDs;
	questionIDs = request.session.questionIDs;
	currentQID = request.param('Question_ID');
	sessionCode = request.param('SessionCode');
	content = request.param('response').trim();
	
	var user = request.session.user;
	var nextQuestion = questionIDs.indexOf(currentQID) + 1;

	// need to prevent double post!

	if(user) {
		if(respondIDs.indexOf(currentQID) == -1) {
			RM.createResponse({ Question_ID : currentQID, User_ID : user[0].User_ID, Content : content }, function(o) {
				
				//sending the message to pull!
				io.sockets.emit('push-response', { message : 'push', questionID : currentQID});
				if(nextQuestion == questionIDs.length) {
					PM.getPoll(sessionCode, function(poll) {
						response.render('final.jade', { title: 'SmartClickR | Poll Completed', locals: { pdata : poll }});
					});
				} else {
					request.session.respondIDs.push(currentQID);
					request.session.respondIDs.save;
					response.redirect('/poll/' + sessionCode + '/question/' + questionIDs[nextQuestion]);
				}
			});
		} else {
			response.redirect('/poll/' + sessionCode + '/question/' + questionIDs[nextQuestion]);
		}
	} else {
		if(respondIDs.indexOf(currentQID) == -1) {
			RM.createPublicResponse({ Question_ID : currentQID, Content : content }, function(o) {
				io.sockets.emit('push-response', { message : 'push', questionID : currentQID});

				if(nextQuestion == questionIDs.length) {
					request.session.questionIDs = '';
					PM.getPoll(sessionCode, function(poll) {
						response.render('final.jade', { title: 'SmartClickR | Poll Completed', locals: { pdata : poll }});
					});
				} else {
					request.session.respondIDs.push(currentQID);
					request.session.respondIDs.save;
					response.redirect('/poll/' + sessionCode + '/question/' + questionIDs[nextQuestion]);
				}
			});
		} else {
			response.redirect('/poll/' + sessionCode + '/question/' + questionIDs[nextQuestion]);
		}
	}
}

// GET /user/:User_ID/poll/:Poll_ID/question/:Question_ID
exports.responseData = function(request, response) {
	var currentQID = request.param('Question_ID');
	var userID = request.param('User_ID');
	var pollID = request.param('Poll_ID');

	// send questionData in JSON format
	FM.getResponseData(currentQID, function(result) {
		response.json(result);
	});
}

// GET /user/:User_ID/poll/:Poll_ID/question/present/:Question_ID
exports.presentPollQuestion = function(request, response) {
	var currentQID = request.param('Question_ID');
	var questionIDs = request.session.questionIDs;
	var userID = request.param('User_ID');
	var pollID = request.param('Poll_ID');
	var sessionCode = request.session.SessionCode;

	FM.getQuestionPID(currentQID, pollID, function(questionData) {

		if(questionData == 'question-doesnt-exist') {
			response.redirect('/');
		} else {
			response.render('present.jade', { title: 'SmartClickR | Present Data', locals : { qdata : questionData, udata : userID, pdata : pollID, currentQID : currentQID.toString(), sessionCode : sessionCode, QuestionIDs : questionIDs}});
		}
	});
}

exports.createSocket = function(socketio) {
	io = socketio;
}

var newQuestionHelper = function(types, questions, pollID, numb, count) {

	var currentCount;
	QM.newQuestion({ Poll_ID : pollID,
				 AType   : types[numb],
				 Order   : numb + 1 }, function(qid) {
		
		var stem = '';
		currentCount = count.shift();
		var question = questions[currentCount - 1];


		if(types[currentCount - 1] == 'MC') {

			var answer = '';
			var choices = question[1];
			stem = question[0];
			
			QM.updateStem({ Stem : stem, Question_ID : qid }, function(o) {
				for(var i = 0; i < choices.length; i++) {
					CM.createMCChoices({ Question_ID : qid, Order : i+1, Answer : answer, Content : choices[i] }, function(err, results) {
						// create choices for MC
					});
				}
			});

		} else if (types[currentCount - 1] == 'TF') {

			stem = question[0];

			QM.updateStem({ Stem : stem,
			 				Question_ID : qid }, function(o) {
				
				if(question.length == 2) {
					CM.createTFChoices({ Question_ID : qid, Answer : question[1] }, function(o) {
						// create choices for TF
					});
				}
			});				

		} else if (types[currentCount - 1] == 'FR') {

			stem = question;
			QM.updateStem({ Stem : stem,
							Question_ID : qid }, function(o) { 
				//do nothing
			});

		} else if (types[currentCount - 1] == 'N') {
	
			stem = question
			QM.updateStem({ Stem : stem,
							Question_ID : qid }, function(o) { 
				//do nothing
			});
		}
	});
}

// need choice id
var updateQuestionHelper = function(qid, types, question, numb, count) {

	var currentCount = count.shift();

	if(types[currentCount - 1] == 'MC') {

		var answer = '';
		var choices = question[1];
		var cids = question[2];
		stem = question[0];
		
		QM.updateStem({ Stem : stem, Question_ID : qid }, function(o) {
			var contents = [];

			for(var i = 0; i < choices.length; i++) {
				contents.push(choices[i]);
				CM.updateMCContent({ Content : choices[i], Order : i+1, Choice_ID : parseInt(cids[i])}, function(err, results) {
					// create choices for MC
				});
			}

			RM.deleteExtraResponses(qid, {A: contents[0], B: contents[1], C: contents[2], D: contents[3]}, function(o) {
				// delete the responses that don't belong!
			});
		});

	} else if (types[currentCount - 1] == 'TF') {

		stem = question[0];
		console.log(question);
		QM.updateStem({ Stem : stem,
		 				Question_ID : qid }, function(o) {
			
			if(question.length == 2) {
				CM.createTFChoices({ Question_ID : qid, Answer : question[1] }, function(o) {
						// create choices for TF
				});

			} else if(question.length == 3) {
				CM.updateTFContent({ Answer : question[1], Choice_ID : question[2][0]}, function() {
					//update choice for true false
				});
			}
		});				

	} else if (types[currentCount - 1] == 'FR') {

		stem = question;
		QM.updateStem({ Stem : stem,
						Question_ID : qid }, function(o) { 
			//do nothing
		});

	} else if (types[currentCount - 1] == 'N') {

		stem = question;
		QM.updateStem({ Stem : stem,
						Question_ID : qid }, function(o) { 
			//do nothing
		});
	}
}