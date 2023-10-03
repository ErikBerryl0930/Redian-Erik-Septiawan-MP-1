const adminRoute = require('express').Router();
const { AdminController } = require('../controllers');
adminRoute.get('/edit/:id', AdminController.editOrderPage);
adminRoute.post('/edit/:id', AdminController.edit);
adminRoute.get('/', AdminController.AdminPage);
module.exports = adminRoute;