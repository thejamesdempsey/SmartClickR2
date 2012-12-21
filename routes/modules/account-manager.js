/*
* SmartClickR Account-Manager Module
* Used for handling user accounts
* Version: 0.8.1
*/


// Requirements for the Module //
var bcrypt = require('bcrypt');
var MC = require('./my-info-config'); 
var mysql = require('mysql');

// DB Credentials //
var HOST = 'localhost';
var PORT = 3306;
var MYSQL_USER = MC.user;
var MYSQL_PASS = MC.pass;
var DATABASE = 'SmartClickR';
var TABLE = 'Users';

console.log(MC.user);
console.log(MC.pass);


// Connect to the DB //
var connection = mysql.createConnection({
	host: HOST,
	port: PORT,
	user: MYSQL_USER,
	password: MYSQL_PASS,
	database: DATABASE,
});


var AM = {};

module.exports = AM;

// Logging in //

AM.autoLogin = function(email, hashPass, callback) {
	connection.query('SELECT * FROM ' + TABLE + ' WHERE Email = ?', [email], function(error, results){
		if (results.length === 1) {
			results[0].Password === hashPass ? callback(null, results) : callback(null);
		} else {
			callback(null);
		}
	});	
}

AM.manualLogin = function(email, pass, callback) {
	connection.query('SELECT * FROM ' + TABLE + ' WHERE Email = ?', [email], function(error, results){
		if (results.length === 0 || results == undefined) {
			callback('user-not-found');
		} else {
			console.log(results);
			bcrypt.compare(pass, results[0].Password, function(err, o) {
				//console.log(o);
				if (o){
					callback(null, results);
				}	else{
					callback('invalid-password');
				}
			});
		}
	});
}


// record insertion, update & deletion methods //

AM.signup = function(newData, callback) {
	connection.query('SELECT * FROM ' + TABLE + ' WHERE email = ?', [newData.Email], function(error, results, fields) {				
		if (error) {
			console.log("Error: " + error);
			connection.destroy();
			console.log('Connection closed');
		} else if (results.length != 0) {
			callback('email-taken');
			//console.log('The email address: ' + newData.Email + ' is already taken.');	
		} else {
			AM.saltAndHash(newData.Password, function(hash) {
				//console.log(hash);
				connection.query('INSERT INTO ' + TABLE + ' (FirstName, LastName, Email, Password) values(?, ?, ?, ?)', [newData.FirstName, newData.LastName, newData.Email, hash], function(error, info){	
					if(error){
						console.log("Error: " + error);
					} else {
						//console.log('Name: ' + newData.FirstName + ' ' + newData.LastName + ', Email: ' + newData.Email);
						callback(null)
					}
				});
			});
		}
	});	
}

/////need to test!
AM.update = function(newData, callback) {
	connection.query('SELECT * FROM ' + TABLE + ' WHERE email = ?', [newData.Email], function(err, result) {
		if(err) {
			console.log("Error: " + err);
			connection.destroy();
			console.log('Connection closed');
		} else {
			/*
			it depends on what user data we want to store
			*/
			if(result[0].Password ===''){
				//updated the new fields
				connection.query('UPDATE ' + TABLE + ' SET FirstName = ?, LastName = ?, Email = ?, Gender = ?, Birthdate = ? ', [newData.FirstName, newData.LastName, newData.Email, newData.Gender, newData.Birthdate] + ' WHERE email = ?', [newData.Email], function(err, o) {
					console.log(o);
					callback(o);
				});
			} else {
				AM.saltAndHash(newData.Password, function(hash) {	
					connection.query('UPDATE ' + TABLE + ' SET FirstName = ?, LastName = ?, Email = ?, Password = ?, Gender = ?, Birthdate = ?,', [newData.FirstName, newData.LastName, newData.Email, hash, newData.Gender, newData.Birthdate] + ' WHERE email = ?', [newData.Email], function(err, o) {
						console.log(o);
						callback(o);
					})
				});
			}
		}
	});
}


AM.setpasword = function(email, newPass, callback) {
	connection.query('SELECT * FROM ' + TABLE + ' WHERE Email = ?', [email], function(err, result) {
		if(err) {
			console.log("Error: " + err);
			connection.destroy();
			console.log('Connection closed');
		} else {
			AM.saltAndHash(newPass, function(hash) {
				var updatePassQuery = 'UPDATE ' + TABLE + ' SET Password = ' + connection.escape(hash) + ' WHERE Email = ' + connection.escape(email);
				connection.query(updatePassQuery, function(err, result) {
					console.log(email + ' has new password: ' + newPass);
					callback(null);
				});
			});
		}
	});	
}

AM.validateLink = function(email, passHash, callback) {
	var sql = 'SELECT * FROM ' + TABLE + ' WHERE Email = ' + connection.escape(email) + ' AND Password = ' + connection.escape(passHash);
	connection.query(sql, function(err, o) {
		if(err) {
			console.log('Error: ' + err);
			connection.destroy();
			console.log('Connection closed');
		} else {
			callback(o.length === 1 ? 'ok' : null);
		}
	});
}

AM.delete = function(id, callback) {
	connection.query('DELETE FROM ' + TABLE + ' WHERE id = ?', [id], function(err, results) {
		if (err) {
			console.log("Error: " + err);
			connection.destroy();
			console.log('Connection closed');
		}  else {
			callback(null);
		}
	});
}


// Auxiliary Methods //

AM.saltAndHash = function(password, callback) {
	bcrypt.genSalt(10, function(error, salt) {
		bcrypt.hash(password, salt, function(error, hash) {
			callback(hash);
		});
	});
}

AM.getEmail = function(email, callback) {
	connection.query('SELECT * FROM ' + TABLE + ' WHERE Email = ?', [email], function(err, results) {
		if (results.length === 1)
			callback(results[0].Email);
	});
}

AM.getUserID = function(email, callback) {
	connection.query('SELECT * FROM ' + TABLE + ' WHERE Email = ?', [email], function(err, results) {
		if (results.length === 1)
			callback(results[0].User_ID);
	});	
}



AM.getAllRecords = function(callback) {


}

// Methods used for Testing //

AM.deleteAllRecords = function(id, callback) {
	connection.query('DELETE FROM ' + TABLE, function(err, results) {
		callback(results);
	});
}
