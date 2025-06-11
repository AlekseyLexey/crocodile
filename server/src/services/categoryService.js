const { Category, Product } = require('../../db/models');

class CategoryService {
  static async findAllCategories() {
    return await Category.findAll({
      attributes: ['id', 'name'],
      include: [
        {
          model: Product,
          as: 'categoryProducts',
          attributes: ['id', 'name', 'price'],
        },
      ],
    });
  }

  static async findCategoryById(categoryId) {
    return await Category.findByPk(categoryId, {
      attributes: ['id', 'name'],
      include: [
        {
          model: Product,
          as: 'categoryProducts',
          attributes: ['id', 'name', 'price'],
        },
      ],
    });
  }
}

module.exports = CategoryService;
