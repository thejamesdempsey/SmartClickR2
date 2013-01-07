var QM = require('./modules/question-manager');
var CM = require('./modules/choice-manager');

// POST /user/:User_ID/poll/:Poll_ID/question/create //
// create each question //
exports.postNewQuestion = function(request, response) {
	QM.newQuestion({Poll_ID : request.param('Poll_ID'),
					AType   : request.param('questionType')}, function(qid) {
		
		console.log("Question ID", qid);
		console.log('Posting Question type....', request.body.questionType);
		if(request.param('questionType') == 'MC') {

		} else if (request.param('questionType') == 'TF') {

			QM.updateStem({ Stem : request.body.question[0],
							Question_ID : qid }, function(o) {
				console.log('Update TF stem');
			});


		} else if (request.param('questionType') == 'FR') {

		} else {
			//numeric
		}
	});
}



/*






*/