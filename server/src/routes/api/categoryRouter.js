const categoryRouter = require('express').Router();
const CategoryController = require('../../controllers/categoryController');
const validateId = require('../../middlewares/validateIdMiddleware');

//categories
categoryRouter.get('/', CategoryController.getAllCategories);
categoryRouter.get('/:id', validateId, CategoryController.getAllCategories);

module.exports = categoryRouter;
