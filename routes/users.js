// Getting relevant libraries to do the task
var express = require('express');
/*var session = require('express-session');*/
var app = express();
var mongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/ExamenNodeJS';
var sessionHelper = require('../model/session.js')

/* GET */
/* index of users in the database */
app.get('/users', function(req, res) {
	mongoClient.connect(url, function(err, db) {
		var collection = db.collection('Users');

		// Find all in 1 object to parse to the view
		collection.find({}).toArray(function(err, data) {
			var users = data;
			res.render('pages/users', {
				users: users,
				user: req.session.user
			});
			db.close();
		});
	});
});

/* clean up function for tried users in the Users collection */
function cleanup() {
	mongoClient.connect(url, function(err, db) {
		var collection = db.collection('Users');
		try {
			collection.deleteMany({ "name": null, 'username': null });
			console.log("Users collection clean for name = null");
		} catch(e) {
			console.log(e);
		}
	});
}

/* GET */
// admin View
app.get('/admin/menu', function(req, res) {
	mongoClient.connect(url, function(err, db) {
		var collection = db.collection('Products');
		collection.find({}).toArray(function(err, products) {
			res.render('pages/adminmenu', {
			user: req.session.user,
			products: products
			});		
			db.close();
		});
	});
});

module.exports = app;