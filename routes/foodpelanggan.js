const foodpelangganRoute = require('express').Router();
const { FoodpelangganController } = require('../controllers');
foodpelangganRoute.get('/', FoodpelangganController.getFoods);
module.exports = foodpelangganRoute;
