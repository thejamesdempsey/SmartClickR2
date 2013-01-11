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

		var choiceID = ''

		it("should create a new choice for a TF question", function(done) {
			CM.createChoice(49, function(o) {
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
	});

	describe("Updating the choices", function() {

		var choiceID = '';

		before(function(done) {
			CM.createChoice(49, function(o) {
				choiceID = o;
				done();
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
			tfQuestionID2;

		before(function(done) {
			QM.newQuestion({ Poll_ID : 8, AType : 'TF'}, function(o) {
				tfQuestionID = o;
				
				QM.newQuestion({ Poll_ID : 8, AType : 'TF'}, function(o) {
					tfQuestionID2 = o;
					done();
				});
			});


		});

		it("should create two choices for a TF question", function(done) {
			CM.createTFChoices({ Question_ID : tfQuestionID, Answer : 'False' }, function(o) {
				connection.query('SELECT * FROM ' + TABLE + ' WHERE Question_ID = ?', [tfQuestionID], function(err, results) {
					results.length.should.equal(2);
					results[0].IsCorrectChoice.should.equal('N');
					results[1].IsCorrectChoice.should.equal('Y');
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

		it("should create two choices with nothing correct when given an empty Answer", function(done) {
			CM.createTFChoices({ Question_ID : tfQuestionID2, Answer : '' }, function(o) {
				connection.query('SELECT * FROM ' + TABLE + ' WHERE Question_ID = ?', [tfQuestionID2], function(err, results) {
					console.log(results);
					results[0].IsCorrectChoice.should.equal('N');
					results[1].IsCorrectChoice.should.equal('N');
					done();
				});
			});
		});



		after(function(done) {
			CM.deleteChoices(tfQuestionID2, function(o) {
				QM.deleteQuestions(8, function(result) {
					done();
				});
			});
		});
	});
})