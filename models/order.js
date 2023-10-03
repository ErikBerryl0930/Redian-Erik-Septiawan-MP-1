'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      order.belongsTo(models.customer)
      order.belongsTo(models.food)
    }
  }
  order.init({
    status: {
      allowNull: false,
      type: DataTypes.STRING
    },
    customerId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    foodId: {
      allowNull: false,
      notNull: false,
      type: DataTypes.INTEGER,
      validate: {
        customValidator(value) {
          if (value === null) {
            throw new Error("ID Makanan Kosong");
          }
        }        
      }
    }
  }, {
    sequelize,
    modelName: 'order',
  });
  return order;
};