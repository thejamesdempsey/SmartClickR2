/*
*	Creating tests for the Poll Manager Module
*	Version 0.0.1
*/

var RM = require('../routes/modules/response-manager');
var AM = require('../routes/modules/account-manager');
var QM = require('../routes/modules/question-manager');
var should = require('should');
var mysql = require('mysql');
var MC = require('../routes/modules/my-info-config');

var HOST = 'localhost';
var PORT = 3306;
var MYSQL_USER = MC.user;
var MYSQL_PASS = MC.pass;
var DATABASE = 'SmartClickR';
var TABLE = 'Responses';

var connection = mysql.createConnection({
	host: HOST,
	port: PORT,
	user: MYSQL_USER,
	password: MYSQL_PASS,
	database: DATABASE,
});

describe("The Response Manager Module", function() {
	describe("Creating responses", function() {

		var uid;
		var qid;

		before(function(done) {
			AM.signup({ Email: 'testResponse@test.com', FirstName: 'Homer', LastName: 'Simpson', Password:'doughnuts' }, function(o) {
				uid = o;
				QM.newQuestion({Poll_ID : 1, AType : 'TF', Order : 1}, function(result) {
					qid = result;
					done();
				});
			});
		});

		it("should create a new response", function(done) {
			RM.createResponse({ Question_ID : qid, User_ID : uid, Content : 'True' }, function(rid) {
				connection.query('SELECT * FROM ' + TABLE + ' WHERE Response_ID = ?', [rid], function(err, results) {
					results[0].Content.should.equal('True');
					done();
				});
			});
		});

		it("should create a new response for a public user", function(done) {
			RM.createPublicResponse({ Question_ID: qid, Content: 'False' }, function(rid) {
				connection.query('SELECT * FROM ' + TABLE + ' WHERE Response_ID = ?', [rid], function(err, results) {
					results[0].Content.should.equal('False');
					done();
				});
			});
		});

		it("should get all the responses for a given question", function(done) {
			RM.getResponses(qid, function(results) {
				results.length.should.equal(2);
				done();
			});
		});

		after(function(done) {
			AM.delete(uid, function(o) {
				QM.delete(qid, function(nothing) {
					done();
				});
			});
		});
	});
});