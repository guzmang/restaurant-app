'use strict'

const restaurantsNearMe = (x, y, restaurants) => {
    let distancesAndRestaurants = [];
    restaurants.forEach(restaurant => {
        let distance = Math.sqrt(Math.pow(x - restaurant.coor_x, 2) + Math.pow(y - restaurant.coor_y, 2));
        distancesAndRestaurants.push({ distance, restaurant });
    });
    distancesAndRestaurants.sort((r1, r2) => r1.distance - r2.distance);
    return distancesAndRestaurants;
};

const orderByCriteria = (criteria, restaurants) => {
    switch (criteria) {
        case "name": // Alphabetical order
            restaurants.sort((r1, r2) => {
                if (r1.name > r2.name) {
                    return 1;
                }
                if (r1.name < r2.name) {
                    return -1;
                }
                return 0;
            });
            break;
        case "rating": // Order by rating
            restaurants.sort((r1, r2) => r2.rating - r1.rating);
            break;
        default: // There is no implementation
            break;
    }
    return restaurants;
};

const buildResponse = (criteria, count, restaurants) => {
    let response = {
        "search_result": {
            criteria,
            count,
            restaurants
        }
    };
    return response;
};

module.exports = {
    restaurantsNearMe,
    orderByCriteria,
    buildResponse
}