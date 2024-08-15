"use strict";
const { Model } = require("sequelize");
const moment = require("moment");
const hashPassword = require("../helpers/hashPassword");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
  
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      id: { type: DataTypes.UUID, allowNull: false, primaryKey: true },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { notEmpty: true },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: { type: DataTypes.STRING},
      isActive: { 
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      createdAt: {
      type: DataTypes.DATE,
      get: function () {
        return this.getDataValue("createdAt") != null
          ? moment(this.getDataValue("createdAt")).format(
              "YYYY-MM-DD HH:mm:ss"
            )
          : null;
      },
    },
    updatedAt: {
      type: DataTypes.DATE,
      get: function () {
        return this.getDataValue("updatedAt") != null
          ? moment(this.getDataValue("updatedAt")).format(
              "YYYY-MM-DD HH:mm:ss"
            )
          : null;
      },
    },

    },
    {
      sequelize,
      hooks: {
        beforeCreate: (instance) => {
          instance.password = hashPassword(instance.password);
        },
        beforeUpdate: (instance) => {
          instance.password = hashPassword(instance.password);
        },
      },
      sequelize,
      modelName: "User",
      tableName:"Users",
      timestamps:false,
    }
  );
  return User;
};
