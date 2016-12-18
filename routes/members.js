// Getting relevant libraries to do the task
var express = require('express');
/*var session = require('express-session');*/
var app = express();
var mongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/ExamenNodeJS';
var sessionHelper = require('../model/session.js')

/* register post of a new user */
/* GET */
// Create GET
app.get('/register', function(req, res) {
	res.render('pages/registerUser', {
		user: user
	});
});

/* POST */
// Create POST
app.post('/register', function(req, res) {
	//console.log(req);
	//console.log(res);
	
	var username = req.body.username;
	var password = req.body.password;
	var role;
	if(typeof req.session.user.role == 'undefined' || req.session.user.role != "") {
		role = "member";
	} else {
		role = req.session.user.role;
	}
	var name = req.body.name;

	var newuser = {
		name: name,
		username: username,
		password: password,
		role: role
	};

	mongoClient.connect(url, function(err, db) {
		var collection = db.collection('Users');
		collection.insert(newuser, function(err, dataObj) {
			collection.find({}).toArray(function(err, data) {
				res.render('pages/users', {
				users: data
				});
				db.close();
			});
		});
	});
});

/* GET */
// Login view
app.get('/login', function(req, res) {
	sessionHelper(req);
	res.render('pages/login', {
		user: req.session.user
		});
});

/* POST */
// Login view
app.post('/login', function(req, res) {

	mongoClient.connect(url, function(err, db) {
		var collection = db.collection('Users');
		collection.findOne({ 'username': req.body.username, 'password': req.body.password}, function(err, user) {
			if(err) {
				console.log(err);
				return res.status(500).send();
			}
 
			if(!user) {
				console.log("No user" + user);
				return res.status(404).send();
			}
			//console.log("/login");
			//console.log(user);
			req.session.user.role = user.role;
			req.session.user._id = user._id;
			req.session.user.name = user.name;
			req.session.user.username = user.username;
			req.session.user.password = user.password;
			//console.log(req.session.user);
			//console.log(user);
			console.log(req.session.user.role);
			res.render('pages/index', {
				user: req.session.user
			})
			db.close();
		});
		
	});
});

/* Logout */
// Redirect to index
app.get('/logout', function(req, res) {
	req.session.destroy(function(err) {
		if(err) {
			console.log(err);
		} else {
			res.redirect('/');
		}
	});
});

/* GET */
/* Porfile acces thorugh login */
app.get('/profile', function(req, res) {
	/* You have to log in to edit profile */
	if(typeof req.session == 'undefined' || typeof req.session.user == 'undefined' || req.session.user.username == "") {
		res.redirect('/');
	}
	res.render('pages/profile', {
		user: req.session.user
	});
});

/* POST */
// your profile is here by your id
app.post('/profile', function(req, res) {
	var userUpdate = req.body;
	mongoClient.connect(url, function(err, db) {
		var collection = db.collection('Users');
		/*collection.findOne({'username': req.body.username}, function(err, user) {
			console.log(user);
			collection.update({ user }, {$set: req.body}, function(err, update) {

			if(err) {
				console.log(err);
				return res.status(500).send();
			}

			res.render('pages/index', {
				user: req.session.user
			});
			db.close();	
			})
		});*/
		userUpdate._id = ObjectId(req.body._id);
		collection.update({ '_id': ObjectId(req.body._id) }, {$set: userUpdate}, function(err, update) {
			if(err) {
				console.log(err);
				return res.status(500).send();
			}
			//console.log("succes: " + update + "\n" + userUpdate._id);
			res.render('pages/index', {
				user: req.session.user
			});
			db.close();
		});
	});
});

module.exports = app;