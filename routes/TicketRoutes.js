var express = require('express');
var router = express.Router();
var checkAuth = require('./checkAuth');
var bodyParser = require('body-parser');
var TicketModel = require('../Models/Ticket');
var EventModel = require('../Models/Event');

router.param('tid', function (req, res, next, tid) {
	TicketModel.findOne({_id: tid}).populate({
		path: 'event',
		select: 'name date -_id'
	}).exec(function (err, ticket) {
		if (err) res.status(404).end();

		req.ticket = ticket;
		next();
	});
});

router.post('/', [bodyParser(), checkAuth], function (req, res) {
	if (!req.user) return;

	var t = new TicketModel({
		name: req.body.name,
		event: req.body.event,
		creator: req.user._id
	});

	t.save(function (err) {
		if (err) res.status(500).end();

		EventModel.findOne({_id: t.event}, function (err, event) {
			event.tickets.push(t);
			event.save(function (err) {
				if (err) res.status(500).end();

				res.json(t);
			});
		});
	});
});

router.get('/:tid', function (req, res) {
	res.json(req.ticket);
});

module.exports = router;