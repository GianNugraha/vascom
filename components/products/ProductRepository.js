const {
    Product
  } = require("../../models");
const { sequelize } = require("../../models");
const { Op, QueryTypes } = require("sequelize");

  
  class ProductRepository {
    static async getProduct(req, res, next) {
      
      try {
        const take = parseInt(req.query.take) || 10;
        const skip = parseInt(req.query.skip) || 0; 
        const search = req.query.search || '';
        const data = await Product.findAndCountAll({
          where: {
            name: {
              [Op.like]: `%${search}%`
            }
          },
          limit: take,
          offset: skip,
          order: [['createdAt', 'DESC']]
        });
        return data;
      } catch (error) {
        throw error;
      }
    }
  
    static async getProductById(id) {
      try {
        const product = await Product.findOne({
          where: {
            id,
          },
        });
        return product;
      } catch (error) {
        throw error;
      }
    }
  
    static async addNewProduct(inputValues) {
      try {
        return await Product.create(inputValues);
      } catch (error) {
        throw error;
      }
    }
  
  
    static async deleteProduct(id, t) {
      try {
        return await Product.destroy({
          where: {
            id: id,
          }
        });
      } catch (error) {
        throw error;
      }
    }
  
  }
  
  module.exports = ProductRepository;
  