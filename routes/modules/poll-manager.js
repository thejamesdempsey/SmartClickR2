/*
* SmartClickR Poll-Manager Module
* Used for handling user accounts
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
var TABLE = 'Polls';

// Connect to the DB //
var connection = mysql.createConnection({
	host: HOST,
	port: PORT,
	user: MYSQL_USER,
	password: MYSQL_PASS,
	database: DATABASE,
});

var PM = {};

module.exports = PM;

// Create a New Poll //
//newData will include: User_ID, PollName
PM.createNewPoll = function(newData, callback) {

	// get the current number of polls and add 1
	PM.pollCount(newData.User_ID, function(o){
		var order = o + 1;
		// generate a session code and create a new poll
		PM.generateSessionCode(function(code) {
			var sql = 'INSERT INTO ' + TABLE +' (Owner_ID, PollName, PollOrder, SessionCode, CreateDate) VALUES ('
				+ connection.escape(newData.User_ID) + ', ' + connection.escape(newData.PollName) + ', ' 
				+ connection.escape(order) + ', ' + connection.escape(code) + ', NOW())';
			connection.query(sql, function(err, results) {
				if(err)
					console.log(err);
				else
					callback(code);
			});
		});
	});

}

// Get Poll Id //

PM.getPollId = function(sessionCode, callback) {
	PM.getPoll(sessionCode, function(o) {
		callback(o[0].Poll_ID);
	});
}

// Get User's Polls //

PM.getUsersPolls = function(userId, callback) {
	connection.query('SELECT * FROM ' + TABLE + ' WHERE Owner_ID = ? Order By CreateDate DESC', [userId], function(err, results) {
		callback(results);
		// if(results.length > 0)
		// 	callback(results);
		// else
		// 	callback('no-polls-found');
	});
}

// Edit Poll Name //

PM.changePollName = function(sessionCode, newName, callback) {
	connection.query('UPDATE ' + TABLE + ' SET PollName = ? WHERE SessionCode = ?', [newName, sessionCode], function(err, results) {
		if(err) {
			console.log('Error: ', err);
			connection.destroy();
			console.log('Connection closed');
		} else {
			callback(null);
		}
	});
}

// Edit/Update Poll Description //

PM.updatePollDescription = function(sessionCode, description, callback) {
	connection.query('UPDATE ' + TABLE + ' SET PollDescription = ? WHERE SessionCode = ?', [description, sessionCode], function(err, results) {
		if(err) {
			console.log('Error: ', err);
			connection.destroy();
			console.log('Connection closed');
		} else {
			callback(null);
		}
	});
}

// Set Start Time //

PM.setStartTime = function(sessionCode, int, callback) {

}


// Set End Time //

PM.setEndTime = function(sessionCode, int, callback) {


}

// Update Poll Order //

PM.updateOrder = function(sessionCode, int, callback) {


}

// Delete Poll //
//should really be SessionCode
PM.delete = function(userID, pollName, callback) {
	connection.query('DELETE FROM ' + TABLE + ' WHERE Owner_ID = ? and PollName = ?', [userID, pollName], function(err, results) {
		if (err) {
			console.log('Error: ', err);
			connection.destroy();
		} else 
			callback(null);
	});
}

PM.getPoll = function(sessionCode, callback) {
	connection.query('SELECT * FROM ' + TABLE + ' WHERE SessionCode = ?', [sessionCode], function(err, results) {
		if (results.length === 1)
			callback(results);
		else 
			callback('poll-not-found');
	});
}

/***  Helper methods  ***/

// Generate Session Code //

PM.generateSessionCode = function(callback) {
	
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	var code;

	do { 
		code = "";
		for( var i=0; i < 4; i++ )
        	code += possible.charAt(Math.floor(Math.random() * possible.length));
	} while (PM.sessionCodeExist(code, function(o){}));

	callback(code);
}

PM.sessionCodeExist = function(sessionCode, callback) {
	connection.query('SELECT * FROM ' + TABLE + ' WHERE SessionCode = ?', [sessionCode], function(err, results) {
		if (results.length === 1)
			callback(true);
		else
			callback(false);
	});
}


PM.pollCount = function(userId, callback) {
	connection.query('SELECT * FROM ' + TABLE + ' WHERE Owner_ID = ?', [userId], function(err, results) {
		if(results.length > 0)
			callback(results.length);
		else
			callback(0);
	});
}

PM.getNumberIfString = function(item, callback) {
	var result;
	if(typeof item === "string")
		result = Number(item);
	else
		result = item;
	callback(result);
}