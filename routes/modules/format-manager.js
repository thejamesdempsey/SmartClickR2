/*
* SmartClickR Format-Manager Module
* Used for formatting results from queries for easy use
* Version: 0.0.1
*/


// Required Modules //
var MC = require('./my-info-config'); 
var mysql = require('mysql');
var QM = require('./question-manager');
var CM = require('./choice-manager');
var RM = require('./response-manager');

// DB Credentials //
var HOST = 'localhost';
var PORT = 3306;
var MYSQL_USER = MC.user;
var MYSQL_PASS = MC.pass;
var DATABASE = 'SmartClickR';
var POLLS = 'Polls';
var QUESTIONS = 'Questions';
var RESPONSES = 'Responses';
var CHOICES = 'Choices';

// Connect to the DB //
var connection = mysql.createConnection({
	host: HOST,
	port: PORT,
	user: MYSQL_USER,
	password: MYSQL_PASS,
	database: DATABASE,
});

var FM = {};

module.exports = FM;

// Get and format all questions and choices from a poll //
// used for the edit page //
FM.getQuestions = function(pollID, callback) {
	QM.getQuestions(pollID, function(questions) {
		var size = [];
		for(var i = 0; i < questions.length; i++) {
			size.push(i);
			CM.getChoices(questions[i].Question_ID, function(choices) {
				questions[size.shift()]["Choices"] = choices;
			});		
		}

		setTimeout(function() {
			callback(questions);
		}, 8);
	});
}

FM.getQuestionSC = function(questionID, sessionCode, callback) {
	QM.getQuestionSC(questionID, sessionCode, function(question) {

		CM.getChoices(questionID, function(choices) {
			question[0]["Choices"] = choices;
		});
		
		setTimeout(function() {
			callback(question);
		}, 5);
	});
}

FM.getQuestionPID = function(questionID, pollID, callback) {
	QM.getQuestionPID(questionID, pollID, function(question) {

		CM.getChoices(questionID, function(choices) {
			question[0]["Choices"] = choices;
		});
		
		setTimeout(function() {
			callback(question);
		}, 5);
	});
}

FM.getResponseData = function(questionID, callback) {
	connection.query('SELECT AnswerType FROM ' + QUESTIONS + ' WHERE Question_ID = ?', [questionID], function(err, type) {
		var qType = type[0].AnswerType;

		if(qType == 'MultipleChoice') {
			FM.getMCdata(questionID, function(result) {
				callback(result);
			});
		} else if(qType == 'TrueFalse') {
			FM.getTFdata(questionID, function(result) {
				callback(result);
			});
		} else if(qType == 'Numeric' || qType == 'FreeResponse') {
			FM.getFRNdata(questionID, function(result) {
				callback(result);
			});
		}

	});
}

FM.getMCdata = function(questionID, callback) {
	connection.query('SELECT Content FROM Choices WHERE Question_ID = ?', [questionID], function(err, results) {
		var size = [];
		if(results.length > 0) {
			for(var i = 0; i < results.length; i++) {
				size.push(i);
				RM.getContentCount({ Question_ID : questionID, Content : results[i].Content }, function(o) {
					results[size.shift()]["Value"] = parseInt(o.count);
				});
			}
			
			setTimeout(function() {
				callback(results);
			}, 8);
		}
	});
}

FM.getTFdata = function(questionID, callback) {
	var result = [];
	var trueResponses = {};
	var falseResponses = {};

	trueResponses["Content"] = "True";
	falseResponses["Content"] = "False";
	
	RM.getContentCount({ Question_ID : questionID, Content : trueResponses["Content"] }, function(o) {
		trueResponses["Value"] = parseInt(o.count);
		result.push(trueResponses);
		
		RM.getContentCount({ Question_ID : questionID, Content : falseResponses["Content"] }, function(count) {
			falseResponses["Value"] = parseInt(count.count);
			result.push(falseResponses);
			callback(result);
		});
	});	
}

FM.getFRNdata = function(questionID, callback) {
	connection.query('SELECT DISTINCT Content FROM ' + RESPONSES + ' WHERE Question_ID = ?', [questionID], function(err, results) {
		var size = [];
		if(results.length > 0) {
			for(var i = 0; i < results.length; i++) {
				size.push(i);
				RM.getContentCount({ Question_ID : questionID, Content : results[i].Content }, function(o) {
					results[size.shift()]["Value"] = parseInt(o.count);
				});
			}
		}

		setTimeout(function() {
			callback(results);
		}, 15);
	});
}

FM.arrayQID = function(questionID, callback) {
	var result = []
	for(var i = 0; i < questionID.length; i++) 
		result.push(questionID[i].Question_ID.toString());
	callback(result);
}