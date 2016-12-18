var express = require('express');
var session = require('express-session');
var app = express();
var fs = require('fs');

var BodyParser = require('body-parser');
app.use(BodyParser.urlencoded({
	extended: true
}));
app.use(BodyParser.json());

app.use(session({secret: 'blabla'}));

app.set('view engine', 'ejs');

// Link http://stackoverflow.com/questions/13486838/cant-get-stylesheet-to-work-with-ejs-for-node-js
// Declare a static folder, to bind /bootstrap to /
app.use('/bootstrap', express.static(__dirname + '/bootstrap'));
app.use('/css', express.static(__dirname + '/css'));
app.use('/jss', express.static(__dirname + '/jss'));

fs.readdirSync(__dirname + '/jss').forEach(function(fileName) {
	if(~fileName.indexOf('.js')) require(__dirname + '/jss/' + fileName)
});

var sessionHelper = require('./model/session.js');

/*
function session(req) {
	var valueReturn = true;
	console.log(typeof req.session.user);
	if(typeof req.session.user == 'undefined') {
		req.session.user = {
			username: "",
		    password: "",
		    name: ""
		};
		valueReturn = false;
	}

	return valueReturn;
}*/
/* routes */
// index.ejs
app.get('/', function(req, res) {
	// A small module function to make a session user if needed
	sessionHelper(req);

	res.render('pages/index', {
		user: req.session.user
	});
});

// Users.js imported
var users = require('./routes/users.js');
app.use(users);

// by importing products to be the controller
var products = require('./routes/products.js');
app.use(products);

// Orders.js imported
var orders = require('./routes/orders.js');
app.use(orders);

// Usercontrols.js
var members = require('./routes/members.js');
app.use(members);

/* Could be
	var users = require('./routes/users.js');
	app.use(users);
*/

// Put the server online
app.listen(3000, function() {
	console.log("conntected to port 3000");
});