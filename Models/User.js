var m = require('mongoose');
var Schema = m.Schema;

module.exports = function () {
	var UserSchema = new Schema({
		username: String,
		password: String,
		email: String,
		role: Number,
	});

	return m.model('User', UserSchema);
}();
