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

  static async findAllByCategory(categoryId) {
    const allProducts =  await Product.findAll({
      where: {
        category_id: categoryId
      },
      attributes: ['id', 'name', 'price', 'category_id'],
    });

    return allProducts? allProducts.map(product => product.get({plain:true})) : null
  }

  
}

module.exports = ProductService;