const BuyService = require('../services/buyService');
const { formatResponse } = require('../utils/formatResponse');

class BuyController {
  static async createBuy(req, res, next) {
    try {
      const userId = res.locals.user.id;
      const { productId } = req.body;

      const newBuy = await BuyService.createNewBuy({ productId, userId });

      return res.status(201).json(formatResponse(201, 'Success', newBuy));
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
        return res.status(404).json(formatResponse(404, 'Buy not found', null));
      }

      return res.status(200).json(formatResponse(200, 'Success', deletedCount));
    } catch (err) {
      next(err);
    }
  }

  static async getProductsByUserId(_, res, next) {
    try {
      const userId = res.locals.user.id;

      const buys = await BuyService.findProductsByUserId(userId);

      return res.status(200).json(formatResponse(200, 'Success', buys));
    } catch (err) {
      next(err);
    }
  }
}

module.exports = BuyController;
