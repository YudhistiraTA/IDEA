'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.User, {
        foreignKey: "authorId",
      });
      Product.belongsTo(models.Category, {
        foreignKey: "categoryId",
      });
      Product.belongsToMany(models.Customer, {
        through: models.CustomerProduct,
        foreignKey: "ProductId",
        otherKey: "CustomerId"
      })
      Product.hasMany(models.CustomerProduct, {
        foreignKey: "ProductId",
      });
    }
  }
  Product.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Name is required"
        },
        notNull: {
          args: true,
          msg: "Name is required"
        },
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Description is required"
        },
        notNull: {
          args: true,
          msg: "Description is required"
        },
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Price is required"
        },
        notNull: {
          args: true,
          msg: "Price is required"
        },
        minValue(value) {
          if (value < 100) {
            throw new Error("Minimum price is Rp. 100,00");
          }
        }
      }
    },
    stock: DataTypes.INTEGER,
    imgUrl: DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
    authorId: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};