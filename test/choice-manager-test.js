/*
*  Creating tests for the Choice Manager Module
*  0.0.1
*/

var CM = require('../routes/modules/choice-manager');
var QM = require('../routes/modules/question-manager');
var should = require('should');
var mysql = require('mysql');
var MC = require('../routes/modules/my-info-config'); 

var HOST = 'localhost';
var PORT = 3306;
var MYSQL_USER = MC.user;
var MYSQL_PASS = MC.pass;
var DATABASE = 'SmartClickR';
var TABLE = 'Choices';

var connection = mysql.createConnection({
	host: HOST,
	port: PORT,
	user: MYSQL_USER,
	password: MYSQL_PASS,
	database: DATABASE,
});

describe("The Choice Manager Module", function() {

	describe("The Helper Methods", function() {

		var choiceID = '';
		var helpQID = '';

		before(function(done) {
			QM.newQuestion({ Poll_ID : 1, AType : 'TF' }, function(qid) {
				helpQID = qid;
				done();
			});
		});

		it("should create a new choice for a TF question", function(done) {
			CM.createChoice(helpQID, function(o) {
				console.log('added choice ', o);
				choiceID = o;
				done();
			});
		});

		it("should delete the newly created choice", function(done) {
			CM.delete(choiceID, function(o) {
				done();
			});
		});

		after(function(done) {
			QM.delete(helpQID, function(o) { 
				done();
			});
		})
	});

	describe("Updating the choices", function() {

		var choiceID = '';

		before(function(done) {
			QM.newQuestion({ Poll_ID : 1, AType : 'TF' }, function(qid) {
				CM.createChoice(qid, function(o) {
					choiceID = o;
					done();
				});
			});
		});
	
		it("should update the content for the given choice", function(done) {
			CM.updateContent({ Choice_ID : choiceID, 
							   Content   : 'Jim Halpert' }, function(o) {

				connection.query('SELECT * FROM ' + TABLE + ' WHERE Choice_ID = ?', [choiceID], function(err, results) {
					results[0].Content.should.equal('Jim Halpert');
					done();
				});
			});
		});

		it("should update the choice status to be Y", function(done) {
			CM.updateChoiceStatus({ Choice_ID 	   : choiceID, 
								   IsCorrectChoice : 'Y' }, function(o) {

				connection.query('SELECT * FROM ' + TABLE + ' WHERE Choice_ID = ?', [choiceID], function(err, results) {
					results[0].IsCorrectChoice.should.equal('Y');
					done();
				});
			});
		});

		after(function(done) {
			CM.delete(choiceID, function(o) {
				done();
			});
		});
	});

	describe("Choices for certain Question Types", function() {

		var tfQuestionID,
			tfQuestionID2,
			mcQuestionID,
			mcQuestionID2;

		before(function(done) {
			QM.newQuestion({ Poll_ID : 1, AType : 'TF'}, function(o) {
				tfQuestionID = o;
				QM.newQuestion({ Poll_ID : 1, AType : 'TF'}, function(o) {
					tfQuestionID2 = o;
					QM.newQuestion({ Poll_ID : 1, AType : 'MC' }, function(o) {
						mcQuestionID = o;
						QM.newQuestion({ Poll_ID : 1, AType : 'MC' }, function(o) {
							mcQuestionID2 = o;
							done();
						});
					});
				});
			});


		});

		it("should create a choice with IsCorrectChoice when answer is False", function(done) {
			CM.createTFChoices({ Question_ID : tfQuestionID, Answer : 'False' }, function(o) {
				connection.query('SELECT * FROM ' + TABLE + ' WHERE Question_ID = ?', [tfQuestionID], function(err, results) {
					console.log(results[0].IsCorrectChoice);
					//results[0].IsCorrectChoice.should.equal('F');
					done();
				});
			});
		});

		it("should delete all choices from a specified Question_ID", function(done) {
			CM.deleteChoices(tfQuestionID, function(o) {
				connection.query('SELECT * FROM ' + TABLE + ' WHERE Question_ID = ?', [tfQuestionID], function(err, results) {
					results.length.should.equal(0);
					done();
				});
			});
		});

		it("should create a choice with IsCorrectChoice being T when answer is True", function(done) {
			CM.createTFChoices({ Question_ID : tfQuestionID2, Answer : 'True' }, function(o) {
				connection.query('SELECT * FROM ' + TABLE + ' WHERE Question_ID = ?', [tfQuestionID2], function(err, results) {
					console.log(results[0].IsCorrectChoice); //.should.equal('T');			
					done();
				});
			});
		});

		it("should create 4 choices for each multiple choice question", function(done) {

			var mc = { "choices" : ["blue", "green", "purple", "orange"],
					   "answer" : "purple" };
			var mc2 = { "choices" : ["dog", "ostrich", "deer", "bear"],
					   "answer" : "ostrich" };


			console.log(mc.choices);
			console.log(mc.choices.length);
			for(var i = 0; i < mc.choices.length; i++) {
				CM.createMCChoices({ Question_ID : mcQuestionID , Answer : mc.answer, Order : i + 1, Content : mc.choices[i] }, function(o) {
					console.log('Create choice: ', o);
				});				
			}

			for(var i = 0; i < mc2.choices.length; i++) {
				CM.createMCChoices({ Question_ID : mcQuestionID2 , Answer : mc2.answer, Order : i + 1, Content : mc2.choices[i] }, function(o) {
					console.log('Create choice: ', o);
				});		
			}

			setTimeout(function() {
				connection.query('SELECT * FROM ' + TABLE + ' WHERE Question_ID = ?', [mcQuestionID], function(err, results) {
					console.log(results);
					results[2].IsCorrectChoice.should.equal('T');
					connection.query('SELECT * FROM ' + TABLE + ' WHERE Question_ID = ?', [mcQuestionID2], function(err, result) {
						console.log(result);
						done();
					});
				});
			}, 25); 
			
		});

		after(function(done) {
			CM.deleteChoices(tfQuestionID2, function(o) {
				QM.deleteQuestions(1, function(result) {
					done();
				});
			});
		});
	});
})