var QM = require('./modules/question-manager');
var CM = require('./modules/choice-manager');
var PM = require('./modules/poll-manager');
var FM = require('./modules/format-manager');
var RM = require('./modules/response-manager');

// POST /user/:User_ID/poll/:Poll_ID/question/create //
// create each question //
exports.postNewQuestion = function(request, response) {

	QM.newQuestion({ Poll_ID : request.param('Poll_ID'),
					 AType   : request.param('questionType'),
					 Order   : request.param('count') }, function(qid) {
		
		console.log("Question ID", qid);
		console.log('Posting Question type....', request.body.questionType);

		var stem = '';

		if(request.param('questionType') == 'MC') {

			var answer = '';
			var choices = request.param('question')[1];
			stem = request.param('question')[0];
			console.log('Stem ',request.param('question')[0]);
			
			QM.updateStem({ Stem : stem, Question_ID : qid }, function(o) {
				for(var i = 0; i < choices.length; i++) {

					CM.createMCChoices({ Question_ID : qid, Order : i+1, Answer : answer, Content : choices[i] }, function(err, results) {
						// create choices for MC
					});
				}
			});

		} else if (request.param('questionType') == 'TF') {

			stem = request.body.question[0];
			console.log(stem);
			console.log(request.body.question[1]);

			QM.updateStem({ Stem : stem,
			 				Question_ID : qid }, function(o) {
				
				if(request.body.question.length == 2) {
					CM.createTFChoices({ Question_ID : qid, Answer : request.body.question[1] }, function(o) {
						// create choices for TF
					});
				}
			});				

		} else if (request.param('questionType') == 'FR') {

			stem = request.body.question[0];
			QM.updateStem({ Stem : stem,
							Question_ID : qid }, function(o) { 
				//do nothing
			});

		} else if (request.param('questionType') == 'N') {
	
			stem = request.body.question[0];
			QM.updateStem({ Stem : stem,
							Question_ID : qid }, function(o) { 
				//do nothing
			});
		}
	});
}

// GET /poll/:SessionCode/question/:Question_ID //
exports.pollQuestion = function(request, response) {
	questionIDs = request.session.questionIDs;
	currentQID = request.param('Question_ID');
	sessionCode = request.param('SessionCode');

	FM.getQuestion(currentQID, function(questionData) {
		response.render('response.jade', { title: 'SmartClickR | Poll Response', locals: { QuestionIDs : questionIDs, qdata : questionData , session : sessionCode }})
	});
}

// POST /poll/:SessionCode/question/:Question_ID //
exports.postResponse = function(request, response) {
	questionIDs = request.session.questionIDs;
	currentQID = request.param('Question_ID');
	sessionCode = request.param('SessionCode');
	content = request.param('response').trim();
	
	var user = request.session.user;
	var nextQuestion = questionIDs.indexOf(currentQID) + 1;

	if(user) {
		RM.createResponse({ Question_ID : currentQID, User_ID : user[0].User_ID, Content : content }, function(o) {
			if(nextQuestion == questionIDs.length) {
				PM.getPoll(sessionCode, function(poll) {
					response.render('final.jade', { title: 'SmartClickR | Poll Completed', locals: { pdata : poll }});
				});
			} else {
				response.redirect('/poll/' + sessionCode + '/question/' + questionIDs[nextQuestion]);
			}
		});
	} else {
		RM.createPublicResponse({ Question_ID : currentQID, Content : content }, function(o) {
			if(nextQuestion == questionIDs.length) {
				request.session.questionIDs = '';
				PM.getPoll(sessionCode, function(poll) {
					response.render('final.jade', { title: 'SmartClickR | Poll Completed', locals: { pdata : poll }});
				});
			} else {
				response.redirect('/poll/' + sessionCode + '/question/' + questionIDs[nextQuestion]);
			}
		});
	}
}

// GET /user/:User_ID/poll/:Poll_ID/question/:Question_ID
exports.responseData = function(request, response) {
	var currentQID = request.param('Question_ID');
	var userID = request.param('User_ID');
	var pollID = request.param('Poll_ID');

	// send questionData in JSON format
	//response.render('present.jade', {title: 'SmartClickR | Lets Present' });
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

	FM.getQuestion(currentQID, function(questionData) {
		response.render('present.jade', { title: 'SmartClickR | Present Data', locals : { qdata : questionData, udata : userID, pdata : pollID, currentQID : currentQID.toString(), QuestionIDs : questionIDs}});
	});
}
