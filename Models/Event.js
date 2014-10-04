var m = require('mongoose');
var Schema = m.Schema;

module.exports = function () {
	var EventSchema = new Schema({
		name: String,
		date: Date,
		desc: String,
		price: Number,
		mods: [{type: Schema.Types.ObjectId, ref:'User'}],
		tickets: [{type: Schema.Types.ObjectId, ref: 'Ticket'}],
	});

	return m.model('Event', EventSchema);
}();