const CategoryService = require('../services/categoryService');
const { formatResponse } = require('../utils/formatResponse');

class CategoryController {
  static async getAllCategories(_, res, next) {
    try {
      const categories = await CategoryService.findAllCategories();

      return res.status(200).json(formatResponse(200, 'Success', categories));
    } catch (err) {
      next(err);
    }
  }

  static async getCategoryById(req, res, next) {
    try {
      const categoryId = req.validateId;

      const category = await CategoryService.findCategoryById(categoryId);

      if (!category) {
        return res
          .status(404)
          .json(formatResponse(404, 'Category not found', null));
      }

      return res.status(200).json(formatResponse(200, 'Success', category));
    } catch (err) {
      next(err);
    }
  }
}

module.exports = CategoryController;
