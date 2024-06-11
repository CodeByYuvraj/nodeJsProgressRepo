const express = require('express');
const router = express.Router();
const services = require('../services/router.services');

router.get('/', services.homeRoute);
router.get('/upcoming-events', services.upcomingEventsRoute);

module.exports = router;