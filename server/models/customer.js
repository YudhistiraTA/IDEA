'use strict';
const bcrypt = require('bcryptjs');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Customer.belongsToMany(models.Product, {
        through: models.CustomerProduct,
        foreignKey: "CustomerId",
        otherKey: "ProductId"
      })
      Customer.hasMany(models.CustomerProduct, {
        foreignKey: "CustomerId",
      });
    }
  }
  Customer.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Email is already in use"
      },
      validate: {
        notEmpty: {
          msg: "Email is required"
        },
        notNull: {
          msg: "Email is required"
        },
        isEmail: {
          msg: "Invalid email format"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Password is required",
        },
        notEmpty: {
          args: true,
          msg: "Password is required",
        },
        minLength(value) {
          if (value && value.length < 5) {
            throw new Error("Password must be at least 5 characters long");
          }
        }
      },
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "Customer"
    }
  }, {
    hooks: {
      beforeBulkCreate(users) {
        users.map((user) => {
          const salt = bcrypt.genSaltSync(10);
          const hash = bcrypt.hashSync(user.password, salt);
          user.password = hash;
        });
      },
      beforeCreate(user) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(user.password, salt);
        user.password = hash;
      },
    },
    sequelize,
    modelName: 'Customer',
  });
  return Customer;
};