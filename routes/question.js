var QM = require('./modules/question-manager');
var CM = require('./modules/choice-manager');

// POST /user/:User_ID/poll/:Poll_ID/question/create //
// create each question //
exports.postNewQuestion = function(request, response) {

	QM.newQuestion({Poll_ID : request.param('Poll_ID'),
					AType   : request.param('questionType')}, function(qid) {
		
		console.log("Question ID", qid);
		console.log('Posting Question type....', request.body.questionType);

		var stem = '';

		if(request.param('questionType') == 'MC') {

			var choices = request.param('question')[1];
			var answer = '';
			console.log('Stem ',request.param('question')[0]);
			
			for(var i = 0; i < choices.length; i++) {

				CM.createMCChoices({ Question_ID : qid, Order : i+1, Answer : answer, Content : choices[i] }, function(err, results) {
					// create choices for MC
				});
			}
				console.log('Choice ' + i + ': ' + choices[i]);

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
							Question_ID : qid }, function(o) { });

		} else if (request.param('questionType') == 'N') {
			//numeric
			stem = request.body.question[0];
			QM.updateStem({ Stem : stem,
							Question_ID : qid }, function(o) { });
		}
	});
}



/*






*/