const buyRouter = require('express').Router();
const BuyController = require('../../controllers/buyController');
const validateId = require('../../middlewares/validateIdMiddleware');

//buies
buyRouter.post('/', BuyController.createBuy);
// buyRouter.put('/:id', validateId, BuyController.updateBuy);
buyRouter.delete('/:id', validateId, BuyController.deleteBuy);
buyRouter.get('/user', BuyController.getProductsByUserId);
buyRouter.patch('/activate/:id', validateId, BuyController.activateBuy);
buyRouter.patch('/deactivate/:id', validateId, BuyController.deactivateBuy);
// buyRouter.get('/active/:categoryName', BuyController.getActiveBuyInCategory);
buyRouter.get('/active/avatar', BuyController.getActiveAvatar);
module.exports = buyRouter;
