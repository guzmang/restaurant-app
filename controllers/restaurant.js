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

        let distancesAndRestaurants = [];
        let nearbyRestaurants = [];

        distancesAndRestaurants = RestaurantUtils.restaurantsNearMe(x, y, restaurants);
        distancesAndRestaurants = distancesAndRestaurants.slice(0, count);
        distancesAndRestaurants.forEach(r => nearbyRestaurants.push(r.restaurant));

        nearbyRestaurants = RestaurantUtils.orderByCriteria(criteria, nearbyRestaurants);

        return res.status(200).send(
            RestaurantUtils.buildResponse(criteria, count, nearbyRestaurants)
        );
    }
}

module.exports = controller;