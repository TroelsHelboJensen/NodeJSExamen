var value = function (req) {
	//console.log(req.session.user);
	if(typeof req.session.user == 'undefined') {
		req.session.user = {
			_id: "",
			username: "",
		    password: "",
		    name: "",
		    role: ""
		};

		req.session.user.basket = {
			total: 0,
			items: 0
		};
	}

	if(typeof req.session.user.orders == 'undefined') {
		req.session.user.orders = [];
	}
}

module.exports = value;