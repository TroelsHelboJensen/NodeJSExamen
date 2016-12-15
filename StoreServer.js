var express = require('express');
var app = express();
var fs = require('fs');

var BodyParser = require('body-parser');
app.use(BodyParser.urlencoded({
	extended: true
}));
app.use(BodyParser.json());

app.set('view engine', 'ejs');

// Link http://stackoverflow.com/questions/13486838/cant-get-stylesheet-to-work-with-ejs-for-node-js
// Declare a static folder, to bind /bootstrap to /
app.use('/bootstrap', express.static(__dirname + '/bootstrap'));
app.use('/jss', express.static(__dirname + '/jss'));

fs.readdirSync(__dirname + '/jss').forEach(function(fileName) {
	if(~fileName.indexOf('.js')) require(__dirname + '/jss/' + fileName)
});

/* routes */
// index.ejs
app.get('/', function(req, res) {
	res.render('pages/index');
});

// by importing products to be the controller
var products = require('./routes/products.js');
app.use(products);


// Users.js imported
var users = require('./routes/users.js');
app.use(users);

/* Could be
	var users = require('./routes/users.js');
	app.use(users);
*/

// Put the server online
app.listen(3000, function() {
	console.log("conntected to port 3000");
});