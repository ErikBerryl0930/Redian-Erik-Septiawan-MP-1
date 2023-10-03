const route = require('express').Router();
const { customer, food, order } = require('../models');


route.get('/', (req, res) => {

    food.findAll({
        order: [
            ['id', 'asc']
        ]
    })
    .then(result=> {
        res.render('index.ejs', {foods : result})
    })
    .catch(err => res.send(err));

})
const customerRoutes = require('./customer');
const foodRoutes = require('./food');
const foodpelangganRoutes = require('./foodpelanggan')
const orderRoutes = require('./order');
const adminRoutes = require('./admin');
route.use('/foodpelanggan', foodpelangganRoutes);
route.use('/customers', customerRoutes);
route.use('/admin', adminRoutes);
route.use('/orders', orderRoutes);
route.use('/foods', foodRoutes);
module.exports = route;