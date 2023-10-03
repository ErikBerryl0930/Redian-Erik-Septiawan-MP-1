const orderRoute = require('express').Router();
const { OrderController } = require('../controllers');
orderRoute.post('/edit/:id', OrderController.edit);
orderRoute.get('/deleteOrder/:id', OrderController.deleteOrder);
orderRoute.get('/edit/:id', OrderController.editOrderPage);
orderRoute.get('/', OrderController.getOrders);
orderRoute.get('/create', OrderController.createOrderPage);
orderRoute.get('/order/:id', OrderController.orderFood);
orderRoute.get('/delete/:id', OrderController.delete);
orderRoute.post('/create', OrderController.create);
orderRoute.get('/information/:id', OrderController.information);





module.exports = orderRoute;
