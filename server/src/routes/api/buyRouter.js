const buyRouter = require('express').Router();
const BuyController = require('../../controllers/buyController');

//buies
buyRouter.post('/', BuyController.createBuy);
buyRouter.delete('/', BuyController.deleteBuy);
buyRouter.get('/user', BuyController.getProductsByUserId);

module.exports = buyRouter;
