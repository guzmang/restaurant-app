'use strict'

const express = require('express');
const RestaurantController = require('../controllers/restaurant');

const router = express.Router();

router.get('/', RestaurantController.home);
router.get('/search', RestaurantController.search);
router.get('/*', RestaurantController.invalid);

module.exports = router;