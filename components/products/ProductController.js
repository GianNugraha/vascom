const ProductService = require("../Products/ProductService");
const sequelize = require("sequelize");

class ProductController {

  static async getProduct(req, res, next) {
    try {
      const products = await ProductService.getProduct(req);
      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }

  static async getProductById(req, res, next) {
    try {
        const {id} = req.params;
        const products = await ProductService.getProductById(id);
        res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }

  static async addProduct(req, res, next) {
    try {
      
      const { name, price } = req.body;

      if (!name || !price ) { 
        throw { message: 'badRequest-addNewProduct' };
      }
      const inputValues = {
        name, price
      };

      const newProduct = await ProductService.addNewProduct(
        inputValues
      );
      res.status(201).json(newProduct);
    } catch (error) {
      next(error);
    }
  }

  static async deleteProduct(req, res, next) {
    try {
      const { id } = req.params;
      const deleteProduct = await ProductService.deleteProduct(id);
      res.status(201).json("Success Deleted Data");
    } catch (error) {
      next(error);
    }
  }
  
}
module.exports = ProductController;
