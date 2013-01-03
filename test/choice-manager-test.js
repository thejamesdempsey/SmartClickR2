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
			CM.createChoice(25, function(o) {
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
			CM.createChoice(25, function(o) {
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

		after(function(done) {
			CM.delete(choiceID, function(o) {
				done();
			});
		});
	});
})