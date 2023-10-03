const { customer, food, order } = require('../models');

class OrderController {
    static async create(req,res) {
        try {
            const { customerId, foodId, status } = req.body;
            const orders = await order.create({
                customerId: +customerId,
                foodId: +foodId, 
                status: 'pending'
            })
            res.redirect(`/orders/information/${customerId}`)
        } 
        catch (err) {
            res.json(err);
        }
    }
    static async getOrders(req, res) {
        try {
            const orders = await order.findAll({           
                include: [customer, food],
                order: [
                    ['id', 'asc']
                ]
            });
            res.json(orders);
        } catch (err) {
            res.json(err);
        }
    }
    static createOrderPage() {
    }
    static async editOrderPage(req, res) {
        try {
            const findId = +req.params.id;
            const infoOrder = await order.findOne({
                where : {
                    id: findId
                }, 
                include: [customer, food]
            })
            res.render('admin/editOrder.ejs', { order: infoOrder });
        }
        catch (err) {
            res.json(err);
        }
    }
    static async edit(req, res) {
        try {
            const id = +req.params.id;
            const { customerId, foodId, status } = req.body;
            console.log(status);
            const editOrderStatus = await order.update({
                status: status
            }, {
                where: {id:id}
            })
            const acceptHeader = req.get("Accept");
            if(acceptHeader && acceptHeader.includes("text/html")){
                res.redirect('/admin') 
            } else{
                editOrderStatus[0] === 1 ? 
                res.json(`Pesanan ${id} Berhasil Diubah`) :
                res.json(`Something is wrong!`)
            }
        }
        catch (err) {
            res.json(err);
        }
    }
    static async information(req, res) {
        try {
            const findId = +req.params.id;
            const infoOrder = await order.findAll({
                where : {
                    customerId: findId
                },
                include: [customer, food],
                attributes: {
                    include: ['id']
                },
                order: [
                    ['updatedAt', 'desc']
                ]
            })       
            res.render('customer/customerOrder.ejs', {orders : infoOrder})
        }

        catch (err) {
            res.json(err);
        }
    }
    static async delete(req, res) {
        try {
            const findId = +req.params.id;
            const deleteOrder = await order.destroy({
                where : {
                    id: findId
                }
            })
           
            const acceptHeader = req.get("Accept");
            if(acceptHeader && acceptHeader.includes("text/html")){
                res.redirect('/admin') 
            } else{
                deleteOrder === 1 ?
                res.json(`Order with id ${findId} has been deleted`) :
               res.json(`Something is wrong!`)
            }
        }
        catch (err) {
            res.json(err);
        }
    }
    static async deleteOrder(req, res) {
        try {
            const findId = +req.params.id;
            const infoOrder = await order.findOne({
                where : {
                    id: findId
                },
                include: [customer, food]
            }) 
        const deleteOrder = await order.destroy({
                where : {
                    id: findId
                }
            })
            res.redirect(`/orders/information/${infoOrder.customer.id}`)
        }
        catch (err) {
            res.json(err);
        }
    }
    static async orderFood(req, res) {   
        const id = +req.params.id;
        res.render('customer/customerOrderFood.ejs', {id});
    }
}
module.exports = OrderController;