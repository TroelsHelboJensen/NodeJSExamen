// Getting relevant libraries to do the task
var express = require('express');
var app = express();
var mongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/ExamenNodeJS';

// Routees for the products
/* Can be used
	- app.get
	- app.post
	- app.put    	- update product with route
	- app.delete
*/
/* Make these pages
	- Index: app.get('/products', func)
	- 
*/

// Index: app.get('/products', func)
app.get('/products', function(req, res) {
	mongoClient.connect(url, function(err, db) {
		var collection = db.collection('Products');

		collection.find({}).toArray(function(err, data) {
			var product = data;
			res.render('pages/products', {
				products: product
			});
			db.close();
		});
	});
});

module.exports = app;