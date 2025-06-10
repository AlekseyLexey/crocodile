const ProductService = require('../services/productService');

class ProductController {
  static async getAllProducts(_, res, next) {
    try {
      const products = await ProductService.findAllProducts();

      return res.status(200).json({
        message: 'Success',
        data: products,
      });
    } catch (err) {
      next(err);
    }
  }

  static async getProductById(req, res, next) {
    try {
      const productId = req.validateId;

      const product = await ProductService.findProductById(productId);

      if (!product) {
        return res.status(404).json({
          message: 'Product not found',
          data: null,
        });
      }

      return res.status(200).json({
        message: 'Success',
        data: product,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ProductController;
