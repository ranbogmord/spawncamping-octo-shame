var m = require('mongoose');
var Schema = m.Schema;

module.exports = function () {
	var TicketSchema = new Schema({
		name: String,
		event: {type: Schema.Types.ObjectId, ref: 'Event'},
		creator: {type: Schema.Types.ObjectId, ref: 'User'}
	});

	return m.model('Ticket', TicketSchema);
}();