'use strict';

var config = require('../config');
var path = require('path');

var crypto = require('crypto');
var fs = require('fs');

let SSO = require("@anzuev/studcloud.sso");

module.exports = function(app){

	app.all('*', function(req, res, next) {
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
		res.header('Access-Control-Allow-Headers', 'Content-Type');
		next();
	});


    app.get('/private/files/:id', function(req, res, next){ console.log(req.context); next();}, SSO.checkAuthMiddleware, require('./handlers/sendFile'));


	app.get('/private/documents/download/:id/:title',  SSO.checkAuthMiddleware, require('./handlers/makeZipToDownLoad'));

	app.get('/private/uploadForm', function(req, res, next){
		res.sendFile(path.join(__dirname, "../index.html"));
	})


};