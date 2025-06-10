const ProductService = require('../services/productService');
const { formatResponse } = require('../utils/formatResponse');

class ProductController {
  static async getAllProducts(_, res, next) {
    try {
      const products = await ProductService.findAllProducts();

      return res.status(200).json(formatResponse(200, 'Success', products));
    } catch (err) {
      next(err);
    }
  }

  static async getProductById(req, res, next) {
    try {
      const productId = req.validateId;

      const product = await ProductService.findProductById(productId);

      if (!product) {
        return res
          .status(404)
          .json(formatResponse(404, 'Product not found', null));
      }

      return res.status(200).json(formatResponse(200, 'Success', product));
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ProductController;
