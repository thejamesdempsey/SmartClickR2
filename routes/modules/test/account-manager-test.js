/*
*  Creating tests for the Account Manager Module
*  0.5.0
*/

var AM = require('../app/server/modules/account-manager');
var should = require('should');
var mysql = require('mysql');
var MC = require('../app/server/modules/my-info-config');
var bcrypt = require('bcrypt');

var HOST = 'localhost';
var PORT = 3306;
var MYSQL_USER = MC.user;
var MYSQL_PASS = MC.pass;
var DATABASE = 'SmartClickR';
var TABLE = 'Users';

var connection = mysql.createConnection({
	host: HOST,
	port: PORT,
	user: MYSQL_USER,
	password: MYSQL_PASS,
	database: DATABASE,
});

describe("The Account Manager Module", function() {

	describe("Registering an account", function() {
		it("should add a new user account to the database", function(done){
			AM.signup({
				FirstName : 'Jimm-eye',
				LastName  : 'Demp-C',
				Email     : 'jimmy@jimmy.com',
				Password  : 'jimmy123'  
			}, function(err, result){
				//result returns null
				connection.query('SELECT * FROM ' + TABLE + ' WHERE Email = ' + connection.escape('jimmy@jimmy.com'), function(err, results) {
					results[0].Email.should.equal('jimmy@jimmy.com');
					done();
				});
				
			});	
		});

		it('should return email-taken if we try to register with jimmy again', function(done) {
			AM.signup({
				FirstName : 'Jimm-eye',
				LastName  : 'Demp-C',
				Email     : 'jimmy@jimmy.com',
				Password  : 'apple4eveR'  
			}, function(err, result){
				//result.should.equal('email-taken');
				err.should.equal('email-taken');
				done();
			});	
		});
		
		after(function(done) {
			var sql = 'DELETE FROM Users WHERE Email = ' + connection.escape('jimmy@jimmy.com');
			connection.query(sql, function(o) {
				done();
			});
			
		});
	});
	
	
	describe("Logging into an account", function() {

		before(function(done) {
			AM.signup({
				FirstName : 'Fred',
				LastName  : 'Flinstone',
				Email    : 'flinstone@stone.org',
				Password : 'yabadaba'
			}, function(err, o) {
				done(err);
			});
		});

		it("manualLogin should return the user's data in an array if the user's input matches the db", function(done) {
			AM.manualLogin('flinstone@stone.org', 'yabadaba', function(err, o) {
				o[0].Email.should.equal('flinstone@stone.org');
				done();
			});
		});

		it('manualLogin should return user-not-found if the email does not exist', function(done) {
			AM.manualLogin('fake@fakie.com', 'blahblah', function(err, o) {
				err.should.equal('user-not-found');
				done();
			});
		});

		it('manualLogin should return invalid-password if the password was incorrect', function(done) {
			AM.manualLogin('flinstone@stone.org', 'wrongPassword', function(err, o) {
				err.should.equal('invalid-password');
				done();
			});
		});

		
		it("autoLogin should return all the user data", function(done) {
			AM.autoLogin('autologin@mocha.com', '$2a$10$tjD40tiwcwcadgaCUbgMpOUSnO34FBPXWe4uYspcGJrsr8qrHz02C', function(err, o) {
    			o[0].Email.should.equal('autologin@mocha.com');
				done();
			});
		});

		it('autologin should return null if the hashed password does not match the db', function(done) {
			AM.autoLogin('autologin@mocha.com', '$2a$10$tjD40tiwcwcadgaCUbgMpOUSnO34FBPXWe4uYspcGJrsr8qrZ3jk6', function(err, o) {
    			var testResult = err === null;
    			testResult.should.be.true;
				done();
			});
		});
		
		after(function(done) {
			var sql = 'DELETE FROM ' + TABLE + ' WHERE Email = ' + connection.escape('flinstone@stone.org');
			connection.query(sql, function(err, o) {
				done(err);
			});
		});

	});
	
	describe("Editing an account", function() {

		
		before(function(done) {
			AM.signup({
				FirstName : 'Bradlye',
				LastName  : 'Fisch',
				Email    : 'corvettes@bfisch.com',
				Password : 'linux'
			}, function(err, o) {
				done();
			});
		});
		
		/*
		it("should delete the user with the given userid", function(done) {
			AM.delete(13, function(result) {
				//result returns null
				done();
			});
		});
		*/
		
		
		it("should set a new password for Bradlye", function(done) {
			AM.setpasword('corvettes@bfisch.com', 'cars', function(o) {
				done();
			});
		});

		
		it("should validate the link for a given password and email hash", function(done) {
			AM.validateLink('autologin@mocha.com', '$2a$10$tjD40tiwcwcadgaCUbgMpOUSnO34FBPXWe4uYspcGJrsr8qrHz02C', function(o) {
				o.should.equal('ok');
				done();
			});
		});
		
		it("validate link should return null if email or password do not match", function(done) {
			AM.validateLink('bademail@mocha.com', '$2a$10$tjD40tiwcwcadgaCUbgMpOUSnO34FBPXWe4uYspcGJrsr8qrHz02C', function(o) {
				var testResult = o === null;
				testResult.should.equal.true;
				done();
			});
		});

		after(function(done) {
			var sql = 'DELETE FROM users WHERE email = ' + connection.escape('corvettes@bfisch.com');
			connection.query(sql, function(err, o) {
				done(err);
			});
		});
	});

	
	describe("The Account Manager auxilary methods", function() {

		it("should salt and hash a given word", function(done) {
			AM.saltAndHash('pandas', function(hash) {
				bcrypt.compare('pandas', hash, function(err, o) {
					o.should.be.true;
					done();
				});
			});
		});

		it("should return return the userid from a given email", function(done) {
			AM.getUserID('autologin@mocha.com', function(o) {
				o.should.equal(47);
				done();
			});
		});

		it("should return a user's email from a given email", function(done) {
			AM.getEmail('autologin@mocha.com', function(o) {
				o.should.equal('autologin@mocha.com');
				done();
			});
		});
	});

});