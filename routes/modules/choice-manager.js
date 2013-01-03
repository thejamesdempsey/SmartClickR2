/*
* SmartClickR Choice-Manager Module
* Used for handling question choices
* Version: 0.0.1
*/


// Required Modules //
var MC = require('./my-info-config'); 
var mysql = require('mysql');

// DB Credentials //
var HOST = 'localhost';
var PORT = 3306;
var MYSQL_USER = MC.user;
var MYSQL_PASS = MC.pass;
var DATABASE = 'SmartClickR';
var TABLE = 'Choices';

// Connect to the DB //
var connection = mysql.createConnection({
	host: HOST,
	port: PORT,
	user: MYSQL_USER,
	password: MYSQL_PASS,
	database: DATABASE,
});

var CM = {};
module.exports = CM;

// Choices for True/False //


// Choices for Multiple Choice //

// Choices for Numeric //

	/** If there was a correct answer(s) for Numeric **/

// Choices for Free Response //

	/** If there was a correct answer(s) for Free Response **/


// Delete All Choices for a Question //


// Update Choice //

// Update Content //
CM.updateContent = function(choiceData, callback) {
	connection.query('UPDATE ' + TABLE + ' SET Content = ? WHERE Choice_ID = ?', [choiceData.Content, choiceData.Choice_ID], function(err, result) {
		if(err) {
			console.log('Error: ', err);
			connection.destroy();
			console.log('Connection is closed');
		} else {
			callback(null);
		}
	});
}

// Update Correct //

/****** Helper Methods ******/

// Create a choice // 
CM.createChoice = function(questionID, callback) {
	CM.choiceCount(questionID, function(count) {
		connection.query('INSERT INTO ' + TABLE + ' (Question_ID, ChoiceOrder) VALUES (?, ?)', [questionID, count + 1], function(err, results) {
			if(err) {
				console.log('Error: ', err);
				connection.destroy();
				console.log('Connection is closed');
			} else {
				callback(results.insertId);
				console.log('new choice added for question ' + questionID);
			}
		});
	});
}

// Get the choice count for a question //
CM.choiceCount = function(questionID, callback) {
	connection.query('SELECT * FROM ' + TABLE + ' WHERE Question_ID = ?', [questionID], function(err, results) {
		if(results.length > 0)
			callback(results.length);
		else
			callback(0);
	});
}

// Delete Choice //
CM.delete = function(questionID, callback) {
	connection.query('DELETE FROM ' + TABLE + ' WHERE Choice_ID = ?', [questionID], function(err, result) {
		if(err) {
			console.log('Error: ', err);
			connection.destroy();
			console.log('Connection is closed');
		} else {
			callback(null);
			//console.log('delete question ', questionID);
		}
	});
}

