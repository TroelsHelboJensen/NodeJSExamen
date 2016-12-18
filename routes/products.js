// Getting relevant libraries to do the task
var express = require('express');
var app = express();
var mongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/ExamenNodeJS';
var sessionHelper = require('../model/session.js');
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

/* GET */
// Create View
app.get('/products/create', function(req, res) {
	res.render('create', {
		user: req.session.user
	});
});

/* POST */
// Create Product
app.post('products/create', function(req, res) {
	mongoClient.connoct(url, function(err, db) {
		var coleection = db.collection('Products');
		collection.insert({name: req.body.name, price: req.body.price}, function(err, update) {
			res.render('pages/adminmenu', {
				user: req.session.user
			});
		});
	});
});

/* GET */
// Index: app.get('/products', func)
app.get('/products', function(req, res) {
	sessionHelper(req);
	mongoClient.connect(url, function(err, db) {
		var collection = db.collection('Products');

		collection.find({}).toArray(function(err, data) {
			var products = data;
			
			res.render('pages/products', {
				products: products,
				user: req.session.user
			});
			db.close();
		});
	});
});

/* POST */
// Making new order
app.post('/product/buy', function(req, res) {
	//console.log("sesion.user: " + typeof req.session.user + "\n" + "body.id: " + req.body._id);
	//console.log(req.session.user);
	//console.log(typeof req.session.user.name);
	if(typeof req.session.user == 'undefined') {
		sessionHelper(req);
		res.redirect('/login');
	} else 
	{
		mongoClient.connect(url, function(err, db) {
			if(err) {
				console.log("/product/buy: " + err)
			}
			var collection = db.collection('Products');
			collection.findOne({'_id': ObjectId(req.body._id)}, function(err, product) {
				if(err) {
					console.log("in findOne: " + err)
				}
				
				req.session.user.orders.push(product);
				req.session.user.basket.total += +product.price;
				req.session.user.basket.items++;
				//console.log(typeof req.session.user.orders);
				/*req.session.user.orders.forEach(function(order) {
					console.log(order);
				});*/
				//console.log(req.session.user.orders.product);
				/*res.render('pages/products', {
					products: products,
					user: req.session.user
				});*/
				res.redirect('/products');
				db.close();
			});
		});
	}
	/*
		1: Find product by db
		2: If no order is places, then make new orders object
		3: Add this product på orders
		4: redirect to the orders page again
	*/
});

/* GET */
// Edit product View
app.get('/product/edit', function(req, res) {
	res.render('pages/product/edit', {
		user: req.session.user
	});
});
module.exports = app;