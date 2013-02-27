/*
* SmartClickR Socket-IO Module
* Used for handling socket-io connection
* and event pushing
* Version: 0.0.5
*/

var app = require('express')();
var server = require('http').createServer(app);

exports.createSocket = function(app, io) {

	io.sockets.on('connection', function(socket) {

		socket.on('get_response', function(data) {
			//only broadcast to the admin to get data
		});

		socket.on('next_question', function(data) {
			//broadcast to every user to get next question
		});

		socket.on('join', function(data) {

		});
	});
}

