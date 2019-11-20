'use strict'
let { restaurants } = require('../models/restaurant');
let RestaurantUtils = require('../utils/restaurantUtils');

const controller = {
    home: function(req, res) {
        return res.status(200).send(
            `Everything works fine. There are ${ restaurants.length } restaurants!`
        );
    },

    search: function(req, res) {
        let x = req.query.coor_x;
        let y = req.query.coor_y;
        let count = req.query.results;
        let criteria = req.query.criteria || "";

        if (isNaN(count) || count < 1)
            return res.status(400).send(
                'Please insert a positive "results" number as a valid parameter request'
            );

        if (!['', 'name', 'rating'].includes(criteria))
            return res.status(400).send(
                'Please insert a valid "criteria" value or don\'t use it\ne.g.: "name" or "rating"'
            );

        let distancesAndRestaurants = [];
        let nearbyRestaurants = [];

        distancesAndRestaurants = RestaurantUtils.restaurantsNearMe(x, y, restaurants);
        distancesAndRestaurants = distancesAndRestaurants.slice(0, count);
        distancesAndRestaurants.forEach(r => nearbyRestaurants.push(r.restaurant));

        nearbyRestaurants = RestaurantUtils.orderByCriteria(criteria, nearbyRestaurants);

        return res.status(200).send(
            RestaurantUtils.buildResponse(criteria, nearbyRestaurants.count, nearbyRestaurants)
        );
    },

    invalid: function(req, res) {
        return res.status(404).send(
            'Not found'
        );
    }
}

module.exports = controller;