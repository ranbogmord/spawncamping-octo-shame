var mongoose = require('mongoose');
var User = require('../Models/User');
var jwt = require('jwt-simple');
var m = require('moment');

module.exports = function (req, res, next) {
	if (req.headers && req.headers['x-app-username'] && req.headers['x-app-password']) {
		User.findOne({username: req.headers['x-app-username']}, function (err, user) {
			if (err) {
				return res.send(401).end();
			} 

			if (!user) {
				return res.send(401).end();
			}

			if (user.password !== req.headers['x-app-password']) {
				return res.send(401).end();
			}

			var expires = m().add(24, 'hours').valueOf();
			var token = jwt.encode({
				iss: user.id,
				exp: expires,
			}, req.app.get('JWTSecret'));

			res.json({
				token: token,
				expires: expires,
				user: user.toJSON()
			});
		});
	} else {
		return res.send(400).end();
	}
};