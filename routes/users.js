// Getting relevant libraries to do the task
var express = require('express');
var app = express();
var mongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/ExamenNodeJS';

/* GET */
/* index of users in the database */
app.get('/users', function(req, res) {
	cleanup();
	mongoClient.connect(url, function(err, db) {
		var collection = db.collection('Users');

		// Find all in 1 object to parse to the view
		collection.find({}).toArray(function(err, data) {
			var users = data;
			res.render('pages/users', {
				users: users
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

/* register post of a new user */
/* GET */
// Create GET
app.get('/register', function(req, res) {
	res.render('pages/registerUser');
});


/* POST */
// Create POST
app.post('/register', function(req, res) {
	//console.log(req);
	//console.log(res);
	
	var username = req.body.username;
	var password = req.body.password;
	var role = "member";
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
// Get view of the update or edit user function by id
app.get('/edit/:id', function(req, res) {
	mongoClient.connect(url, function(err, db) {
		var collection = db.collection('Users');
		collection.findOne({ '_id': ObjectId(req.params.id) }, function(err, data) {
			console.log(data);
			res.render('pages/registerUser', {
				user: data
			});
			db.close();
		});			
			
	});
});


/* GET */
// Login view
app.get('/login', function(req, res) {
	res.render('pages/login');
});

/* POST */
// Login view
app.post('/login', function(req, res) {
	mongoClient.connect(url, function(err, db) {
		var collection = db.collection('Users');
		collection.findOne({ 'username': req.body.username, 'password': req.body.password}, function(err, user) {
			if(err) {
				console.log(err);
				return res.statu(500).send();
			}

			if(!user) {
				console.log("No user" + user);
				return res.statu(404).send();
			}
			
			res.render('pages/index', {
				user: user,
				profileName: user.username
			});
			db.close();
		})
	});
});
module.exports = app;