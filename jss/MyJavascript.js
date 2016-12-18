function loadContent(contentType) {
	console.log(contentType);
	if(contentType == 'createProduct') {
		document.getElementById('list').innerHTML = loadCreateProduct();
	} else {

	}
}

function loadCreateProduct() {
	var value = "";
	
	// Build input to new product
	// 1: Make form
	// 2: 2 input's with name=""
	// 3: input submit
	// 4: make a route in products
	// 5: from route add new product by req.body
	// 6: redirect to the createProduct

	value += '<div class="row">';
/*
	value += 'hej<br><div class="row"><% var index = 1;' + 
			'products.forEach(function(product) { %>' +
				'<% ' +
				'if(index % 4 == 0) { %>' +
					'<div class="row">' +
				'<% } %>' +
				'<div class="col-sm-4">' +
					'<label name="name"><h1><%= product.name %></h1></label>' +
					'<p name="price"><%= product.price %></p>' +
					'<form method="POST" action="/product/buy">' +
						'<input type="hidden" value="<%= product._id %>" name="_id">' +
						'<input type="submit" class="btn" id="buy" value="buy">' +
					'</form>' +
				'</div>' +
				'<% if (index % 3 == 0) { %>' +
					'</div>' +
				'<%}' +
				'index++;' +
			    '}); %>' +
			'</div>';*/
	return value;
}