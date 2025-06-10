const CategoryService = require('../services/categoryService');

class CategoryController {
  static async getAllCategories(_, res, next) {
    try {
      const categories = await CategoryService.findAllCategories();

      return res.status(200).json({
        message: 'Success',
        data: categories,
      });
    } catch (err) {
      next(err);
    }
  }

  static async getCategoryById(req, res, next) {
    try {
      const categoryId = req.validateId;

      const category = await CategoryService.findCategoryById(categoryId);

      if (!category) {
        return res.status(404).json({
          message: 'Category not found',
          data: null,
        });
      }

      return res.status(200).json({
        message: 'Success',
        data: category,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = CategoryController;
