/*
*	Creating tests for the Poll Manager Module
*	Version 0.0.1
*/

var PM = require('../app/server/modules/poll-manager');
var should = require('should');
var mysql = require('mysql');
var MC = require('../app/server/modules/my-info-config');

var HOST = 'localhost';
var PORT = 3306;
var MYSQL_USER = MC.user;
var MYSQL_PASS = MC.pass;
var DATABASE = 'SmartClickR';
var TABLE = 'Polls';

var connection = mysql.createConnection({
	host: HOST,
	port: PORT,
	user: MYSQL_USER,
	password: MYSQL_PASS,
	database: DATABASE,
});

describe("The Poll Manager Module", function() {

	describe("The Helper Methods", function() {

		it("should return a poll given a sessionCode", function(done) {
			//known session code AeB3....
			PM.getPoll('AeB3', function(o) {
				o[0].Poll_ID.should.equal(1);
				done();
			});
		});

		it("should return true if the session code exists in the DB", function(done) {
			PM.sessionCodeExist('AeB3', function(o) {
				o.should.be.true;
				done();
			});
		});

		it("should return false if the session code doesn't exists in the DB", function(done) {
			PM.sessionCodeExist('AeB4', function(o) {
				o.should.be.false;
				done();
			});
		});

		it("should return the Poll ID of the given session code", function(done) {
			PM.getPollId('AeB3', function(o) {
				o.should.equal(1);
				done();
			});
		});

		it("should generate a 4 digit session code", function(done) {
			PM.generateSessionCode(function(o) {
				o.length.should.equal(4);
				done();
			});
		});

		it("should return the amount of polls user 48 has", function(done) {
			PM.pollCount(48, function(o) {
				o.should.equal(1);
				done();
			});
		});

	});
	
	describe("Creating and Updating Polls", function() {
		
		before(function(done) {
			PM.createNewPoll({
				User_ID  : 47,
				PollName : 'Test Poll 1'
			}, function(o) {
				done();
			});
		});

		it("should create a new poll given the user_id and pollname", function(done) {
			PM.createNewPoll({
				User_ID  : 47,
				PollName : 'Test Poll 2' 
			}, function(err, o) {
				done();
			});
		});

		it("should return the 2 Polls that belong to user 47", function(done) {
			PM.getUsersPolls(47, function(o) {
				o.length.should.equal(2);
				done();
			});
		});

		it("should update the name of a poll from Test Poll 1 to Test Awesome!", function(done) {

			connection.query('SELECT * FROM ' + TABLE + ' WHERE PollName = ?', ['Test Poll 1'], function(err, results) {
				PM.changePollName(results[0].SessionCode, 'Test Awesome!', function(o) {
					connection.query('SELECT * FROM ' + TABLE + ' WHERE Poll_ID = ?', [results[0].Poll_ID], function(err, out) {
						out[0].PollName.should.equal('Test Awesome!');
						done();
					});
				});
			});
		});

		// it("should return an array with all the User's polls", function(done) {
		// 	PM.
		// });

		after(function(done) {
			PM.delete(47, 'Test Poll 2', function(o) {
				PM.delete(47, 'Test Awesome!', function(o) {
					done();
				});
			});
		});
	});

});