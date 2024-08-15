const ProductRepository = require("./ProductRepository");
const { sequelize } = require('../../models');
const moment = require("moment");
const { v4: uuidv4 } = require("uuid");
class ProductService {
  static async getProduct(req) {
    try {
      const Product = await ProductRepository.getProduct(req);
      return Product;
    } catch (error) {
      throw error;
    }
  }

  static async getProductById(id) {
    try {
      return await ProductRepository.getProductById(id);
    } catch (error) {
      throw error;
    }
  }

  static async addNewProduct(inputValues) {
    try {
    const newProduct = await ProductRepository.addNewProduct({
        id: uuidv4(),
        name:inputValues.name,
        price:inputValues.price,
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
    });
      return newProduct;
    } catch (err) {
      throw { message: 'badRequest-addProductFailed', error: err };
    }
  }

  static async deleteProduct(id) {
    try {
      return await ProductRepository.deleteProduct(id);
    } catch (error) {
      throw error;
    }
  }
  
}

module.exports = ProductService;
