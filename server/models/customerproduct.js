'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CustomerProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CustomerProduct.belongsTo(models.Customer, {
        foreignKey: "CustomerId",
      });
      CustomerProduct.belongsTo(models.Product, {
        foreignKey: "ProductId",
      });
    }
  }
  CustomerProduct.init({
    CustomerId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CustomerProduct',
  });
  return CustomerProduct;
};