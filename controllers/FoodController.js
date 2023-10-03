const { customer, food, order } = require('../models');
class FoodController {
    static createFoodPage(req,res) {
        res.render('food/createFoodPage.ejs');
    }
    static async create(req,res) {
        try {
            const { name, price, image } = req.body;
            const foods = await food.create({
                name, price, image
            })     
            res.redirect('/foods')
        } 
        catch (err) {
            res.json(err);
        }
    }
    static async delete(req, res) {
        try {
            const id = +req.params.id;

            const deleteFood = await food.destroy({
                where: {id}
            })
            const deleteOrder = await order.destroy({
                where: {foodId: id}
            })
            res.redirect('/foods')
        }
        catch (err) {
            res.json(err);
        }
    }
    static async editFoodPage(req, res) {
        try {
            const findId = +req.params.id;
            const infoFood = await food.findOne({
                where : {
                    id: findId
                }
            })
            res.render('food/editFoodPage.ejs', {food : infoFood});    
        }
        catch (err) {
            res.json(err);
        }     
    }
    static async getFoods(req, res) {
        try {
            const foods = await food.findAll({
                order: [
                    ['id', 'asc']
                ]
            });
            const acceptHeader = req.get("Accept");
            if (acceptHeader && acceptHeader.includes("text/html")) {
                res.render('food/listFood.ejs', {foods})
            } else {
              res.json(foods);
            }
        } catch (err) {
            res.json(err);
        }
    }
    static async information(req, res) {
        try {
            const findId = +req.params.id;
            const infoFood = await food.findOne({
                where : {
                    id: findId
                }
            })
            infoFood === null ?
            res.json(`Makanan dengan ${findId} Tidak Ditemukan`) :
            res.json(infoFood);
        }
        catch (err) {
            res.json(err);
        }
    }
    static async edit(req, res) {
        try {
            const id = +req.params.id;
            const { name, price, image } = req.body;

            const editedFood = await food.update({
                name, price, image
            }, {
                where: {id}
            }) 
            res.redirect('/foods')
        }   
        catch (err) {
            res.json(err);
        }
    }
}
module.exports = FoodController;