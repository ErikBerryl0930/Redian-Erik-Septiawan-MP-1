const { customer, food, order } = require('../models');

class CustomerController {
    static async delete(req, res) {
        try {
            const id = +req.params.id;
            const deleteCustomer = await customer.destroy({
                where: {id}
            })
            const deleteOrder = await order.destroy({
                where: {customerId: id}
            })
            res.redirect('/customers');
        }
        catch(err) {
            res.json(err);
        }
    }
    static async editCustomerPage(req, res) {
        try {
            const findCustomerid = req.params.id;
            const infoCustomer = await customer.findOne({
                where: {
                    id: findCustomerid,
                }
            })
            res.render('customer/editCustomerPage.ejs', {customer : infoCustomer});
        }
        catch (err) {
            res.json(err);
        }
    }
    static async getCustomers(req, res) {
        try {
            const customers = await customer.findAll({
                order: [
                    ['id', 'asc']
                ]
            });  
            const acceptHeader = req.get("Accept");
      if (acceptHeader && acceptHeader.includes("text/html")) {
        res.render('customer/listCustomer.ejs', {customers})
      } else {
        res.json(customers);
      }
        } catch (err) {
            res.json(err);
        }
    }
    static createCustomerPage(req, res) {
        res.render('customer/createCustomerPage.ejs');
    }
    static async create(req,res) {
        try {
            const { name, key, phone, address, image } = req.body;
            const customers = await customer.create({
                name, key, phone, address, image
            })
          
            res.redirect('/customers');
        } 
        
        catch (err) {
            res.json(err);
        }
    }
    static async edit(req, res) {
        try {
            const id = +req.params.id;
            const { name, key, phone, address, image } = req.body;
            const editCustomer = await customer.update({
                name, key, phone, address, image
            }, {
                where: {id}
            })
            
            res.redirect('/customers')
        }
        catch (err) {
            res.json(err);
        }
    }
    static async information(req, res) {
        try {
            const findCustomerid = req.params.id;
            const infoCustomer = await customer.findOne({
                where: {
                    id: findCustomerid,
                }
            })       
            res.redirect(`/customers/customerPage?name=${infoCustomer.name}&key=${infoCustomer.key}`);
        }
        catch (err) {
            res.json(err);
        }
    }
    static async costumerPage(req, res) {
        try {
            const { name, key } = req.query;      
            const customerPage = await customer.findOne({
                where: {
                     name: name, 
                     key:key
                }       
            })
         
            res.render('customer/customerPage.ejs' , {customer : customerPage});
        }
        catch (err) {
            res.json(err);
        }
    }
    static async editCustomerInformationPage(req,res) {
        try {
            const findCustomerid = req.params.id;
            const infoCustomer = await customer.findOne({
                where: {
                    id: findCustomerid,
                }
            })
            res.render('customer/customerPageEdit.ejs',  {customer : infoCustomer});
        }
        catch (err) {
            res.json(err);
        }
    }
    static async editCustomerInformation(req,res) {
        try {
            const id = +req.params.id;
            const { name, key, phone, address, image } = req.body;

            const editCustomer = await customer.update({
                name, key, phone, address, image
            }, {
                where: {id}
            })
            res.redirect(`/customers/customerPage?name=${name}&key=${key}`);
        }
        catch (err) {
            res.json(err);
        }
    }
    static async register(req,res) {
        try {
            const { name, key, phone, address, image } = req.body;
            const customers = await customer.create({
                name, key, phone, address, image
            })
           
            res.redirect('/customers/login');
        } 
        catch (err) {
            res.json(err);
        }
    }
    static registerPage(req, res) {
        res.render('customer/customerRegisterForm.ejs');
    }
    static loginPage(req, res) {
        res.render('customer/customerLoginForm.ejs');
    }
}
module.exports = CustomerController;