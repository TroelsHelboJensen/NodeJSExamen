var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productsSchema = new Schema({
	name: String,
	price: String
});

mongoose.model('Products', productsSchema);