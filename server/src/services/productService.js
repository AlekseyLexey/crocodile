const { Product } = require('../../db/models');

class ProductService {
  static async findAllProducts() {
    return await Product.findAll({
      attributes: ['id', 'name', 'price', 'category_id'],
    });
  }

  static async findProductById(productId) {
    return await Product.findByPk(productId, {
      attributes: ['id', 'name', 'price', 'category_id'],
    });
  }
}

module.exports = ProductService;
