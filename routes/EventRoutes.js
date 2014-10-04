var express = require('express');
var router = express.Router();
var checkAuth = require('./checkAuth');
var bodyParser = require('body-parser');
var EventModel = require('../Models/Event');


router.param('eid', function (req, res, next, eid) {
	req.event = null;
	EventModel.findOne({_id: eid}).populate({
		path: 'tickets',
		select: 'name -_id'
	})
	.populate({
		path: 'mods',
		select: '-password -__v -_id'
	})
	.exec(function (err, event) {
		req.event = event;
		next();
	});
});

router.get('/', [checkAuth], function (req, res) {
    EventModel.find({
    	mods: req.user._id
    })
    .populate({
    	path: "tickets",
    	select: "name -_id"
    })
    .populate({
    	path: "mods",
    	select: "-password -__v -_id"
    })
    .exec(function (err, events) {
    	res.json(events);
    });
});

router.post('/', [bodyParser(), checkAuth], function (req, res) {
	if (!req.user) {
		res.status(401).end();
	}
	var e = new EventModel({
		name: req.body.name,
		date: new Date(req.body.date),
		desc: req.body.desc,
		price: req.body.price,
		mods: [req.user._id]
	});

	e.save(function (err) {
		if (err) res.status(500).end();

		res.json(e);
	});
});

router.put('/:eid', [bodyParser(), checkAuth], function (req, res) {
	if (!req.user) {
		res.status(401).end();
		console.log("err");
	}

	if (!req.event) {
		res.status(404).end();
	}

	var event = req.event;

	event.name = req.body.name || event.name;
	event.date = new Date(req.body.date) || event.date;
	event.desc = req.body.desc || event.desc;
	event.price = req.body.price || event.price;

	EventModel.update({_id:event._id}, {$set: {name: event.name, date: event.date, desc: event.desc, price: event.price}}, function (err) {
		if (err) res.status(400).end();

		res.json(event);
	});
});

router.get('/:eid', [checkAuth], function (req, res) {
	if (!req.user) res.status(401).end();
	if (!req.event) res.status(404).end();

	res.json(req.event);
});

module.exports = router;