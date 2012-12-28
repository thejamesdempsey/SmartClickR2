/*
* SmartClickR Question-Manager Tests
* Testing methods related to the question resources
* Version 0.0.1
*/

// Required Modules //
var MC = require('../routes/modules/my-info-config'); 
var QM = require('../routes/modules/question-manager');
var PM = require('../routes/modules/poll-manager');
var mysql = require('mysql');
var should = require('should');


// DB Credentials //
var HOST = 'localhost';
var PORT = 3306;
var MYSQL_USER = MC.user;
var MYSQL_PASS = MC.pass;
var DATABASE = 'SmartClickR';
var TABLE = 'Questions';

// Connect to the DB //
var connection = mysql.createConnection({
	host: HOST,
	port: PORT,
	user: MYSQL_USER,
	password: MYSQL_PASS,
	database: DATABASE,
});

describe("The Question Manager Module", function() {

	describe("The question manager helper methods", function() {

		it("should return FreeResponse if the input is FR", function(done) {
			QM.getAnswerType('FR', function(result) {
				result.should.equal('FreeResponse');
				done();
			});

		});

		it("should return TrueFalse if the input is TF", function(done) {
			QM.getAnswerType('TF', function(result) {
				result.should.equal('TrueFalse');
				done();
			});
		});

		it("should return MultipleChoice if the input is MC", function(done) {
			QM.getAnswerType('MC', function(result) {
				result.should.equal('MultipleChoice');
				done();
			});
		});

		it("should return the corresponding number if the input was a string", function(done) {
			QM.getNumberIfString('53', function(o) {
				o.should.equal(53);
				done();
			});
		});
	});

	describe("creating, getting, and deleting a question", function() {

		var pollID, questionID, questionID2;

		before(function(done) {
			PM.createNewPoll({ User_ID : 47,
							   PollName: 'Testing Questions'}, function(code) {

				PM.getPollId(code, function(pollId) {
					pollID = pollId;

					QM.newQuestion({ Poll_ID : pollID, 
									 AType   : 'FR'}, function(qid) {

						questionID2 = qid;
						done();
					});
				});

			});
		});

		it("should create a new question", function(done) {
			QM.newQuestion({ Poll_ID : pollID, 
							 AType   : 'TF'}, function(qid) {

				questionID = qid;
				done();
			});
		});

		it("should update the stem of the question", function(done) {
			QM.updateStem({ Stem 		: 'Who is your favorite NBA player?',
							Question_ID : questionID2 }, function(o) {

				QM.getQuestion(questionID2, function(result) {
					result[0].Stem.should.equal('Who is your favorite NBA player?');
					done();
				});
			});
		});

		it("should return all questions for a poll", function(done) {
			QM.getQuestions(pollID, function(o) {
				console.log(o);
				o.length.should.equal(2);
				done();
			});
		});

		it("should delete a question given the question id and poll id", function(done) {
			QM.delete({ Poll_ID     : pollID, 
						Question_ID : questionID }, function(o) {

				QM.questionCount(pollID, function(count) {
					count.should.equal(1);
					done();
				});
			});
		});

		after(function(done) {
			QM.delete({ Poll_ID     : pollID, 
						Question_ID : questionID2 }, function(o) {

				PM.delete(pollID, function(out) {
					done();
				});
			});			
		})
	});

});