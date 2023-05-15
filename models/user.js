'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require("bcryptjs");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Category, {
        through: models.Product,
        foreignKey: "authorId",
        otherKey: "categoryId"
      })
      User.hasMany(models.Product, {
        foreignKey: "authorId",
      });
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Username is required",
        },
        notEmpty: {
          args: true,
          msg: "Username is required",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Email is required",
        },
        notEmpty: {
          args: true,
          msg: "Email is required",
        },
        isEmail: {
          args: true,
          msg: "Invalid email format"
        }
      },
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
          if (value.length < 5) {
            throw new Error("Password must be at least 5 characters long");
          }
        }
      },
    },
    role: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    address: DataTypes.STRING
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
    modelName: 'User',
  });
  return User;
};