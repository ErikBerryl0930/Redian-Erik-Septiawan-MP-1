const { customer, food, foodpelanggan, order } = require('../models');

class FoodpelangganController {
    static async information(req, res) {
        try {
            const findId = +req.params.id;
            const infoFood = await food.findOne({
                where : {
                    id: findId
                }
            })
            infoFood === null ?
            res.json(`Makanan  ${findId} Tidak Ditemukan`) :
            res.json(infoFood);
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
            res.render('food/listFoodpelanggan.ejs', {foods})
        } catch (err) {
            res.json(err);
        }
    }
}
module.exports = FoodpelangganController;