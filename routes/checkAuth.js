var jwt = require('jwt-simple');
var UserModel = require('../Models/User');

var checkAuth = function (req, res, next) {
	var token = req.headers['x-app-token'] || null;

	if (!token) {
		res.send(401).end();
		return;
	}

	try {
		var decode = jwt.decode(token, 'veronica');

		if (decode.exp <= Date.now()) {
			res.send(401).end();
		}

		req.user = null;
		UserModel.findOne({_id: decode.iss}, function (err, user) {
			if (err) {
				res.status(401).end();
			}

			req.user = user;
			next();
		});

	} catch (err) {
		console.error('ERROR: ' + err);
		res.status(500).end();
	}
};

module.exports = checkAuth;