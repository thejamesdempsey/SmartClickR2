/*
* SmartClickR Response-Manager Module
* Used for handling user accounts
* Version: 0.0.1
*/

// Requirements for the Module //
var MC = require('./my-info-config'); 
var mysql = require('mysql');

// DB Credentials //
var HOST = 'localhost';
var PORT = 3306;
var MYSQL_USER = MC.user;
var MYSQL_PASS = MC.pass;
var DATABASE = 'SmartClickR';
var TABLE = 'Responses';

// Connect to the DB //
var connection = mysql.createConnection({
	host: HOST,
	port: PORT,
	user: MYSQL_USER,
	password: MYSQL_PASS,
	database: DATABASE,
});


var RM = {};

module.exports = RM;

// Post Response with User_ID //
RM.createResponse = function(data, callback) {
	connection.query('INSERT INTO ' + TABLE + ' (Question_ID, User_ID, Content) VALUES (?, ?, ?)', [data.Question_ID, data.User_ID, data.Content], function(err, results) {
		if(err) {
			console.log('Error: ', err);
			connection.destroy();
			console.log('Connection closed');
		} else {
			callback(results.insertId);
		}
	});
}


// Post Response without User_ID //
RM.createPublicResponse = function(data, callback) {
	connection.query('INSERT INTO ' + TABLE + ' (Question_ID, Content) VALUES (?, ?)', [data.Question_ID, data.Content], function(err, results) {
		if(err) {
			console.log('Error: ', err);
			connection.destroy();
			console.log('Connection closed');
		} else {
			callback(results.insertId);
		}
	});
}

// Update Response //
RM.updateResponse = function(data, callback) {
	connection.query('UPDATE ' + TABLE + ' SET Content = ? WHERE Response_ID = ?', [data.Content, data.Response_ID], function(err, results) {
		if(err) {
			console.log('Error: ', err);
			connection.destroy();
			console.log('Connection closed');
		} else {
			callback(null);
		}		
	});
}

// Get All Responses for Question //
RM.getResponses = function(questionID, callback) {
	connection.query('SELECT * FROM ' + TABLE + ' WHERE Question_ID = ?', [questionID], function(err, results) {
		if(err) {
			console.log('Error: ', err);
			connection.destroy();
			console.log('Connection closed');
		} else {
			callback(results);
		}
	});
}

// get the count of responses for a specific question //
RM.getContentCount = function(data, callback) {
	connection.query('SELECT count(Content) as count FROM ' + TABLE + ' WHERE Question_ID = ? and Content = ?', [data.Question_ID, data.Content], function(err, results) {
		if(err) {
			console.log('Error: ', err);
			connection.destroy();
			console.log('Connection closed');
		} else {
			callback(results[0]);
		}
	});
}
