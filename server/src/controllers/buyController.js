const BuyService = require('../services/buyService');

class BuyController {
  static async createBuy(req, res, next) {
    try {
      const userId = res.locals.user.id;
      const { productId } = req.body;

      const newBuy = await BuyService.createNewBuy({ productId, userId });

      return res.status(201).json({
        message: 'Success',
        data: newBuy,
      });
    } catch (err) {
      next(err);
    }
  }

  static async deleteBuy(req, res, next) {
    try {
      const userId = res.locals.user.id;
      const { productId } = req.body;

      const deletedCount = await BuyService.deleteBuyById({
        productId,
        userId,
      });

      if (deletedCount === 0) {
        return res.status(404).json({
          message: 'Buy not found',
          data: null,
        });
      }

      return res.status(200).json({
        message: 'Success',
        data: null,
      });
    } catch (err) {
      next(err);
    }
  }

  static async getProductsByUserId(_, res, next) {
    try {
      const userId = res.locals.user.id;

      const buys = await BuyService.findProductsByUserId(userId);

      return res.status(200).json({
        message: 'Success',
        data: buys,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = BuyController;
