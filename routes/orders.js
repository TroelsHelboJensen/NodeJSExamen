// Getting relevant libraries to do the task
var express = require('express');
/*var session = require('express-session');*/
var app = express();
var mongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/ExamenNodeJS';
var sessionHelper = require('../model/session.js');


app.get('/orders/user', function(req, res) {
	res.render('pages/orders', {
		user: req.session.user
	});
});

module.exports = app;