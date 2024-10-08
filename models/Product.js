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
    }
  }
  Product.init({
    id: { type: DataTypes.UUID, allowNull: false, primaryKey: true },
    name: DataTypes.STRING,
    price: { type: DataTypes.DOUBLE}
  }, {
    sequelize,
    modelName: 'Product',
    tableName:"Products"
  });
  return Product;
};