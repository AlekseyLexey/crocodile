const productRouter = require('express').Router();
const ProductController = require('../../controllers/productController');
const validateId = require('../../middlewares/validateIdMiddleware');

//products
productRouter.get('/', ProductController.getAllProducts);
productRouter.get('/:id', validateId, ProductController.getProductById);

module.exports = productRouter;
